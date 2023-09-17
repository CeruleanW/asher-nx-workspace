import React from 'react';
import Section from '../ResumeSectionWrapper';
import Title from '../atomics/Title';
import Language from '../Language';

export function LanguageSection({ languages }) {
  return (
    <Section id='languages'>
      <Title text='languages' />
      <div className='flex justify-between'>
        {languages.map((lang) => (
          <Language
            name={lang.name}
            level={lang.level}
            key={lang.name} />
        ))}
      </div>
    </Section>
  );
}
