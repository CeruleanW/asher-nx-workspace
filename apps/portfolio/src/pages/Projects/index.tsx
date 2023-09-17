import {ProjectSection} from '../../components/organisms/ProjectSection';
import styles from '../../styles/pages/Projects.module.scss';
import { useProjectsData } from '../../hooks';
import { Loading } from '../../components/atomics/Loading';
import {ErrorMsg} from '@root/shared/components/atomics/ErrorMsg';
import { MAX_NUMBER_OF_PROJECTS } from './constants';
import { Title } from './Title';

export function Projects() {
  const { projectData, isLoading, error } = useProjectsData();

  if (error) {
    return <ErrorMsg text={error?.messsage} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  // console.log('projectData', projectData);
  const projects = projectData?.projects?.slice(0, MAX_NUMBER_OF_PROJECTS);

  return (
    <>
      <Title />
      {projects?.map((project: any, index: number) => {
        const isRightNarrow = index % 2 !== 0;
        return (
          <ProjectSection
            key={project.id}
            isRightNarrow={isRightNarrow}
            index={index}
            className={styles['section']}
            {...project}
          />
        );
      })}
    </>
  );
}
