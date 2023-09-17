/**
 * extract and compose experience data
 */
export function getExperienceByVersion(fullData: any, version: string) {
  // version determines features
  const {resume, resumeVersions} = fullData || {};
  const versionedData = resumeVersions?.find(item => item.version === version);
  console.log("getExperienceByVersion ~ versionedData:", versionedData);
  //extract
  const versionedExperience = versionedData?.experience;
  const features = versionedExperience;
  console.log("getExperienceByVersion ~ features:", features);

}
