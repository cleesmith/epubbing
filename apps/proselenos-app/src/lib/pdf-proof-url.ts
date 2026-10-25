/** Keep the PDF available while a browser viewer is still using its URL. */
export function createPdfProofUrl(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const viewers: Window[] = [];
  let released = false;
  let revoked = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const collect = () => {
    if (!released || revoked || viewers.some(viewer => !viewer.closed)) return;
    URL.revokeObjectURL(url);
    revoked = true;
    if (timer) clearInterval(timer);
  };
  return {
    url,
    open() {
      if (released) return false;
      const viewer = window.open(url, '_blank');
      if (!viewer) return false;
      viewer.opener = null;
      viewers.push(viewer);
      return true;
    },
    release() {
      if (released) return;
      released = true;
      collect();
      if (!revoked) timer = setInterval(collect, 2000);
    },
  };
}
