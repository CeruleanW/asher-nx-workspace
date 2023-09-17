import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import Job from '../atomics/Job';
import PositionTitle from '../atomics/PositionTitle';
import CompanyName from '../atomics/CompanyName';
import CompanyIntro from '../atomics/CompanyIntro';
import Duration from '../Duration';
import Location from '../atomics/Location';
import { Features } from '../Features';

const MAX_NUMBER = 2;

/**
 *
 */
export function ExperienceSection({ experience, ...optionals }) {
  const displayedExp = experience?.slice(0, MAX_NUMBER);

  return (
    <Section id='experience'>
      <Title text='Experience' />
      {displayedExp.slice(0, MAX_NUMBER)?.map((job) => {
        const { company, time, features } = job || {};
        const jobTitle = job['job-title'];
        const companyName = company['company-name'];
        const companyIntro = company['company-introduction'];

        return (
          <Job id={jobTitle} key={jobTitle}>
            <PositionTitle>{jobTitle}</PositionTitle>
            <CompanyName>{companyName}</CompanyName>
            {companyIntro ? (
              <CompanyIntro>{companyIntro}</CompanyIntro>
            ) : null}
            <Duration from={time?.from} to={time?.to} className='opacity-80' />
            <span className='mr-20'></span>
            <Location className='opacity-80'>
              {company['company-location']}
            </Location>
            <Features features={features}></Features>
          </Job>
        );
      })}
    </Section>
  );
}
