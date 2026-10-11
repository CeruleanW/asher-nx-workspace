import axios from 'axios';
import yaml from 'js-yaml';
import { PERSONAL_DATA_LINK, PROJECTS_DATA_LINK } from './apis';

export async function fetchPersonalData(): Promise<any> {
  const res = await axios.get(PERSONAL_DATA_LINK);
  return yaml.load(res.data);
}

export async function fetchProjectsData() {
  const res = await axios.get(PROJECTS_DATA_LINK);
  return res?.data;
}
