'use client';

import CustomButton from '@/components/customButtom/component';
import { SignupContent } from '@/utils/types';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { register, handleSubmit } = useForm<SignupContent>();

  return (
    <div>
      Signup page
      <form
        onSubmit={handleSubmit((data) => { console.log(data); })}
      >
        <input {...register('phoneNumber')} />
        <input {...register('password')} />
        <CustomButton
          type="submit"
          content="완료"
        />
      </form>
    </div>
  );
}
