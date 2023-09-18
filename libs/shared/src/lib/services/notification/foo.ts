import { toast } from 'react-toastify';
import { GENERAL_CONTAINER_ID } from './constants';

export function notifyError(msg: any, options?: any) {
  const optionsResult = options
    ? { containerId: GENERAL_CONTAINER_ID, ...options }
    : { containerId: GENERAL_CONTAINER_ID };
  return toast.error(msg, optionsResult);
}

export function notifyWarning(msg: any, options?: any) {
  const optionsResult = options
    ? { containerId: GENERAL_CONTAINER_ID, ...options }
    : { containerId: GENERAL_CONTAINER_ID };
  return toast.warn(msg, optionsResult);
}

export function notifySuccess(msg: any, options?: any) {
  const optionsResult = options
    ? { containerId: GENERAL_CONTAINER_ID, ...options }
    : { containerId: GENERAL_CONTAINER_ID };
  return toast.success(msg, optionsResult);
}

export function notifyInfo(msg: any, options?: any) {
  const optionsResult = options
    ? { containerId: GENERAL_CONTAINER_ID, ...options }
    : { containerId: GENERAL_CONTAINER_ID };
  return toast.info(msg, optionsResult);
}

export function updateNotification(ref, options?: any) {
  const optionsResult = options
    ? { containerId: GENERAL_CONTAINER_ID, ...options }
    : { containerId: GENERAL_CONTAINER_ID };
  return toast.update(ref, optionsResult);
}
