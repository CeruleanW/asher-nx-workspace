/**
 * Module: ImageFileType
 * Description: Handles the image file type.
 */

export const BASE64_FILE_TYPES = {
  '/' : 'jpg',
  'i' : 'png',
  'R' : 'gif',
  'U' : 'webp',
  'P' : 'svg',
}

// Media type: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#common_image_file_types
export const FILE_TYPE_TO_IMG_SRC_PREFIX = {
  'jpg': 'data:image/jpeg;base64,',
  'jpeg': 'data:image/jpeg;base64,',
  'png': 'data:image/png;base64,',
  'svg': 'data:image/svg+xml;base64,',
  'gif': 'data:image/gif;base64,',
  'webp': 'data:image/webp;base64,',
}

export const FILE_TYPE_TO_VIDEO_SRC_PREFIX = {
  'mp4': 'data:video/mp4;base64,',
  'flv': 'data:video/x-flv;base64,',
}