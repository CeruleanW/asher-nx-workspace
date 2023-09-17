import React from 'react';

export default function Language({ name, level, ...optionals }) {
  const levelText = getLevelText(level);

  return (
    <div className='flex-initial flex max-w-lg'>
      <div className='mr-8'>
        <p className='font-semibold'>{name}</p>
        <p className='opacity-90'>{levelText}</p>
      </div>
      <div className='items-center flex'>{renderLevel(level)}</div>
    </div>
  );
}

function getLevelText(level) {
  // #level: 1-Beginner, 2-Intermediate, 3-Advanced, 4-Proficient, 5-Native
  switch (level) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Advanced';
    case 4:
      return 'Proficient';
    case 5:
      return 'Native';
    default:
      throw new RangeError('Invalid Language level. Level must be in 1 to 5');
  }
}

function renderLevel(level) {
  const absentCount = 5 - level;
  let count = 1;

  return (
    <span>
      {[...Array(level)].map((e) => (
        <i className='fas fa-circle filled-seccolor mr-1 text-lg' key={'circle-' + count++}></i>
      ))}
      {[...Array(absentCount)].map((e) => (
        <i className='fas fa-circle mr-1 text-lg' key={'absent-circle-' + count++}></i>
      ))}
    </span>
  );
}
