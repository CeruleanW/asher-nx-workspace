//@ts-nocheck
import {MenuIcon} from '@root/shared/components/atomics/Icon';
import {IconButton} from '@root/shared/components/atomics/IconButton';
import {Typography2} from '@root/shared/components/atomics/Typography';

export function Title({ onClick, ...rest }) {
  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={onClick}
        edge='start'
      >
        <MenuIcon />
      </IconButton>
      <div className='flex flex-grow justify-center md:justify-start'>
        <Typography2 variant='h6' className={'text-3xl'}>
          Google Photos Search Enhancer
        </Typography2>
      </div>
    </>
  );
}
