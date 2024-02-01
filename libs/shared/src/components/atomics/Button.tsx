/* eslint-disable @typescript-eslint/ban-ts-comment */
import MuiButton from '@mui/material/Button';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { ensuredForwardRef } from 'react-use';

//@ts-ignore
const ResetBg = styled(MuiButton) <{ variant: string }>`
  background-color: ${p => p.variant === 'contained' ? '#1976d2' : '#fff'} ; /* fix conflict between tailwindcss and mui button color */
`;

/**
 *
 */
export const Button = ensuredForwardRef((props: any, ref: any) => {
  const { className, variant = 'contained', ...rest } = props;
  return (
    <>
      <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`} ref={ref} {...rest} />
    </>
  );
})




/**
 * Mui Button conflicts with tailwindcss
 */
export const Button2 = ensuredForwardRef((props: any, ref: any) => {
  const { className, variant = 'contained', ...rest } = props;
  return (
    <ResetBg className={`w-max ${className}`} variant={variant} ref={ref} {...rest} />
  );
})
