import axios from 'axios';
import yaml from 'js-yaml';
// import { PERSONAL_DATA_LINK, PROJECTS_DATA_LINK } from './apis';
import {
  getPersonalDataFileUrl,
  getProjectsDataFileUrl,
} from '../features/firebase';

// const LOCAL_PERSONAL_DATA = 'http://localhost:4200/static/personal-data.yaml';

// export async function fetchLocalPersonalData() {
//   const res = await axios.get(LOCAL_PERSONAL_DATA);
//   return yaml.load(res.data);
// }

export async function fetchPersonalData(): Promise<any> {
  // console.debug('fetchPersonalData', getPersonalDataFileUrl());
  const url = await getPersonalDataFileUrl();
  const res = await axios.get(url);
  return yaml.load(res.data);
}

export async function fetchProjectsData() {
  const url = await getProjectsDataFileUrl();
  const res = await axios.get(url);
  return res?.data;
}
