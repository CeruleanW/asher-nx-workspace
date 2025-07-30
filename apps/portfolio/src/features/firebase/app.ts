import { personalDataRef, projectsDataRef } from './config';
import { getDownloadURL } from 'firebase/storage';

export async function getPersonalDataFileUrl() {
  return getDownloadURL(personalDataRef);
}

export async function getProjectsDataFileUrl() {
  return getDownloadURL(projectsDataRef);
}
