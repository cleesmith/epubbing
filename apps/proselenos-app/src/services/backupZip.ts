import { BlobReader, TextReader, Uint8ArrayReader, ZipWriter } from '@zip.js/zip.js';

export type BackupEntry = { name: string; data: string | Blob | Uint8Array };
export type BackupProgress = {
  phase: 'preparing' | 'exporting' | 'finishing';
  filesDone: number;
  filesTotal: number;
  bytesWritten: number;
};
export type BackupExportOptions = {
  signal?: AbortSignal;
  onProgress?: (progress: BackupProgress) => void;
};

/** Write one entry at a time with backpressure. Never concatenate the archive
 * into an ArrayBuffer. STORE avoids recompressing EPUBs, images and audio.
 * zip.js supplies CRCs, streaming headers and ZIP64 when necessary.
 */
export async function writeBackupZip(
  entries: AsyncIterable<BackupEntry>,
  destination: WritableStream<Uint8Array>,
  filesTotal: number,
  { signal, onProgress }: BackupExportOptions = {},
): Promise<void> {
  const output = destination.getWriter();
  const progress: BackupProgress = { phase: 'exporting', filesDone: 0, filesTotal, bytesWritten: 0 };
  let lastReport = -Infinity;
  const report = (force = false) => {
    const now = Date.now();
    if (force || now - lastReport >= 100) {
      lastReport = now;
      onProgress?.({ ...progress });
    }
  };
  const zip = new ZipWriter(new WritableStream<Uint8Array>({
    async write(chunk) {
      signal?.throwIfAborted();
      await output.write(chunk);
      progress.bytesWritten += chunk.byteLength;
      report();
    },
  }), { level: 0, useWebWorkers: false, bufferedWrite: false, dataDescriptor: true, zip64: true });
  try {
    report(true);
    for await (const entry of entries) {
      signal?.throwIfAborted();
      const reader = typeof entry.data === 'string' ? new TextReader(entry.data)
        : entry.data instanceof Blob ? new BlobReader(entry.data) : new Uint8ArrayReader(entry.data);
      await zip.add(entry.name, reader, { signal });
      progress.filesDone++;
      report(true);
    }
    progress.phase = 'finishing';
    report(true);
    await zip.close();
    signal?.throwIfAborted();
    // A successful export means the destination has finished accepting bytes.
    await output.close();
    signal?.throwIfAborted();
    report(true);
  } catch (error) {
    try { await output.abort(error); } catch { /* Preserve the original failure. */ }
    throw error;
  } finally {
    output.releaseLock();
  }
}
