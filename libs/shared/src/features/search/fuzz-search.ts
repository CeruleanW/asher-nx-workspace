import Fuse from 'fuse.js';

export function getFuse(request, options) {
  const fuse = new Fuse(request, options);
  return fuse;
}
