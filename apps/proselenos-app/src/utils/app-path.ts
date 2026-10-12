// Next.js prefixes router navigation itself. Use this for browser APIs and public assets.
const basePath = process.env['NEXT_PUBLIC_BASE_PATH'] || '';

export const appPath = (path: string): string => {
  if (!basePath || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
};
