import React from 'react';

export default function MyButton(props) {
  const { className, ...rest } = props;
  return (
    <>
      <button className={`w-max ${className}`} {...rest} />
    </>
  );
}
