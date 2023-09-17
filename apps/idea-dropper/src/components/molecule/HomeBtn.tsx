import React from 'react';
import Link from 'next/link';
import { Button } from '@root/shared/components/atomics';

export function HomeBtn(props) {
  return (
    <Link href='/'>
      <Button {...props}>Home</Button>
    </Link>
  )
}
