import { storage, personalDataRef, projectsDataRef } from './config';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export async function getPersonalDataFileUrl() {
  return getDownloadURL(personalDataRef);
}

export async function getProjectsDataFileUrl() {
  return getDownloadURL(projectsDataRef);
}
