'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'


const AuthForm = () => {

  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])

  const {  
      register,
      handleSubmit,
      formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant]);
  

  const onSubmit = async (data) => {
    setIsLoading(true);

    if (variant === 'LOGIN') {
      await signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!');
          router.push('/users')
        }
      })
      .finally(() => setIsLoading(false) )
      
    };

    if (variant === 'REGISTER') {
      await axios
      .post('/api/register', data)
      .then(async () => {
        toast.success('User created!');
        await signIn('credentials', data); 
      })
      .catch(() => toast.error('Something went wrong.'))
      .finally(() => setIsLoading(false) );
    }
  };

  const socialActions = async (action) => {
    setIsLoading(true);

    await signIn(action, { redirect: false })
    .then((callback) => {
      if (callback?.error) {
        toast.error('Something went wrong')
      };
      if (callback?.ok && !callback?.error) {
        toast.success('Logged in!');
        router.push('/users')
      };
    })
    .finally(() => setIsLoading(false) )
  };

  return (
    <section className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
          {variant === 'REGISTER' && (
            <Input label="Name" id="name" type="text" disabled={isLoading} required errors={errors} register={register} />
          )}
          <Input label="Email" id="email" type="email" disabled={isLoading} required errors={errors} register={register} />
          <Input label="Password" id="password" type="password" disabled={isLoading} required errors={errors} register={register} />
          <Button type="submit" fullWidth disabled={isLoading} >
            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2">
          <span className="flex-1 bg-gray-300  h-[1px]"/>
          <p className="text-gray-500">Or continue with</p>
          <span className="flex-1 bg-gray-300  h-[1px]"/>
        </div>

        <div className="flex gap-3">
          <AuthSocialButton icon={BsGithub} onClick={() => socialActions('github')}/>
          
          <AuthSocialButton icon={BsGoogle} onClick={() => socialActions('google')}/>
          
        </div>

        {variant === 'LOGIN' ? (
        <p className="text-center text-gray-500">First time using Messanger? 
          <span onClick={() => toggleVariant()} className=" ml-2 font-bold text-gray-800 cursor-pointer underline">
            Create an account
          </span>
        </p>
        ) : (
          <p className="text-center">Already have an account? 
          <span onClick={() => toggleVariant()} className=" ml-2 font-bold text-gray-800 cursor-pointer underline">
            Log in
          </span>
        </p>
        )}
    
      </div>
    </section>
  )
}

export default AuthForm