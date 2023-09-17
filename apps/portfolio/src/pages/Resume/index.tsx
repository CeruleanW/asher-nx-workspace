import { MainResume } from './MainResume';
import { useResumeData } from './hooks';
import { ErrorMsg } from '@root/shared/components/atomics/ErrorMsg';
import { CenteredLoader } from '@root/shared/components/atomics';
import { VERSION } from './constants';
import { getExperienceByVersion } from './processors';

/**
 *
 */
export function Resume(props) {
  const { data, isLoading, error } = useResumeData();

  // Conditions
  if (error) {
    console.error('Resume error', error);
    return <ErrorMsg text={`Error! ${error?.messsage}`} error={error} ></ErrorMsg>;
  }

  if (isLoading) {
    return <CenteredLoader />;
  }

  // console.debug('resumeData', resumeData);
  const { names, resume, resumeVersions } = data || {};
  const versionedData = resumeVersions?.find(item => item.version === VERSION);
  const experience = getExperienceByVersion(data, VERSION);

  return <MainResume {...names} {...resume} {...versionedData} />;
}
