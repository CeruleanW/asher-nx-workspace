import React from 'react';
import {Input} from '@root/shared/components/atomics/Input';

export function CardTitle({...optionals}) {
  return (
    <div className='mb-4'>
      <Input placeholder='Title' className='w-full text-2xl' {...optionals} />
    </div>
  );
}
