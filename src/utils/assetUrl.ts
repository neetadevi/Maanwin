export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';

  // Prevent double prefixing if path already includes the base
  if (path.startsWith(cleanBase)) {
    return path;
  }
  if (path.startsWith('/Maanwin/')) {
    return path;
  }
  if (path.startsWith('Maanwin/')) {
    return '/' + path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
