import { useRef } from 'react';
import Section from './components/ResumeSectionWrapper';
import Title from './components/atomics/Title';
import Content from './components/atomics/Content';
import '../../styles/pages/resume.scss';
import { ReactPrint } from '@root/shared/features/print';
import { FIRSTNAME, LASTNAME } from '../../lib/constants';
import { SkillsSection } from './components/sections/SkillsSection';
import { HeaderSection } from './components/sections/HeaderSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
// import { LanguageSection } from './components/sections/LanguageSection';

const PDF_NAME = FIRSTNAME + LASTNAME + '_Resume';

/**
 *
 */
export function MainResume(props) {
  // Process props
  const fullName = props['full-name'];
  const { email, title, skills, experience, education, languages, location: address, links, summary, phoneNumber } = props || {};
  const { github, portfolio } = links || {};
  const phone = phoneNumber;
  const summaryContent = summary?.version?.short;
  const sideProjects = props['side-projects'];

  // Local state
  const pdfDOM = useRef(null);

  return (
    <>
      <div className='h-12'></div>
      <article
        className='max-w-screen-lg m-auto resume-container px-4'
        ref={pdfDOM}
      >
        <HeaderSection
          name={fullName}
          {...{ phone, address, email, github, portfolio, title }}
        />
        <Section id='summary'>
          <Title text='Summary' />
          <Content>{summaryContent}</Content>
        </Section>
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={sideProjects} />
        <EducationSection education={education} />
        {/* <LanguageSection languages={languages} /> */}
      </article>
      <div className='flex justify-center mt-16'>
        <ReactPrint
          trigger={() => (
            <button className='m-auto print-button button -blue'>Print</button>
          )}
          content={() => pdfDOM.current}
          documentTitle={PDF_NAME}
        />
      </div>
    </>
  );
}
