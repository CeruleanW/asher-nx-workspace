import React from 'react';
import Link from 'next/link';
import { Button, Input, MuiLabel } from '@root/shared/components/atomics';
import { HomeBtn } from '@idea/components/molecule/HomeBtn';
import { useSession } from '@idea/features/auth';
import { useForm } from "react-hook-form";
import { registerUser } from '../features/idea-server';

/**
 *
 */
export default function Signup() {
  // const { data: session } = useSession();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const handleRegisterEmail = (data) => {
    console.log("file: signup.tsx:17 ~ handleRegisterEmail ~ data:", data)

  };

  return (
    <div className={'flex flex-col p-2'}>
      <MuiLabel>Email</MuiLabel>
      <Input {...register("email")}></Input>
      <MuiLabel>Password</MuiLabel>
      <Input {...register("password")}></Input>
      <div className='flex flex-col gap-y-4'>
        <Button className='w-fit' onClick={handleSubmit(handleRegisterEmail)} >Submit</Button>
        {/* to be continued... */}
        <HomeBtn className='w-fit' />
      </div>
    </div>
  )
}
