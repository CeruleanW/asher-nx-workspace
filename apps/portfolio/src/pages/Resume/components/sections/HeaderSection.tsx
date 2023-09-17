import ContactInfo from '../atomics/ContactInfo';
import ContactItem from '../ContactItem';
import Section from '../ResumeSectionWrapper';

export function HeaderSection(props) {
  const {
    name,
    phone,
    email,
    portfolio,
    github,
    address,
    title
  } = props;
  return <Section id='header'>
      <h1 id='name' className='header-name'>
        {name}
      </h1>
      <p id='my-position-title' className='position-title'>
        {title}
      </p>
      <ContactInfo>
        <ContactItem type='phone' text={phone} />
        <ContactItem type='email' text={email} />
        <ContactItem type='address' text={address} />
        <ContactItem type='portfolio' id='portfolio' text={portfolio} />
        <ContactItem type='github' text={github}>
          {github}
        </ContactItem>
      </ContactInfo>
    </Section>;
}
  