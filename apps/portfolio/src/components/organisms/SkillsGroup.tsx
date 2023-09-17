import Heading from '../../../../../libs/shared/src/components/atomics/Heading';
import { Skill } from '../atomics/SkillItem';
import styles from '../../styles/components/components.module.scss';

const SkillSet = (props) => {
  const { title } = props;

  return (
    <div className='mb-4'>
      <p className={`${styles['skill-header']} mb-3`}>{title}</p>
      <div className='w-full flex pl-4 flex-wrap'>{props.children}</div>
    </div>
  );
};


export default function MySkills() {
  return (
    <>
      <Heading>Technical Skills</Heading>
      <div className='flex flex-col justify-between lg:flex-row mt-8'>
        <SkillSet title={'Coding Language'}>
          <Skill>JavaScript</Skill>
          <Skill>TypeScript</Skill>
          <Skill>Java</Skill>
          <Skill>HTML5</Skill>
          <Skill>CSS3</Skill>
          <Skill>Sass/Scss</Skill>
          <Skill>SQL (PostgreSQL)</Skill>
          <Skill>Python</Skill>
        </SkillSet>
        <SkillSet title={'Frameworks & Libs'}>
          <Skill>React.js</Skill>
          <Skill>React Native</Skill>
          <Skill>Node.js</Skill>
          <Skill>Redux</Skill>
          <Skill>Next.js</Skill>
          <Skill>TailwindCSS</Skill>
          <Skill>Jest, Cypress, Appium</Skill>
          <Skill>Material UI</Skill>
        </SkillSet>
        <SkillSet title={'Methods & Tools'}>
          <Skill>Agile Methodology</Skill>
          <Skill>Webpack</Skill>
          <Skill>Babel</Skill>
          <Skill>MongoDB</Skill>
          <Skill>MatLab</Skill>
          <Skill>R</Skill>
          <Skill>Test-Driven Development</Skill>
        </SkillSet>
        <SkillSet title={'Additional'}>
          <Skill>UML</Skill>
          <Skill>SAP</Skill>
          <Skill>BPMN Modeler</Skill>
        </SkillSet>
      </div>
    </>
  );
}
