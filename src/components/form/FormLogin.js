import React from 'react'
import { useState } from 'react';
import supabase from '@/src/pages/api/auth/[...auth]';
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '@/public/image/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/public/image/EyeSlashFilledIcon';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
const FormLogin = ({setRegistro, registro, router}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // El inicio de sesión fue exitoso, puedes redirigir al usuario a otra página.
        
      
        Cookies.set('supabaseSession', data.session.access_token);        
        console.log('Inicio de sesión exitoso', email);
        router.push('/')
      }
    } catch (error) {
      console.error('Error de inicio de sesión', error.message);
      setError(error.message);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const registrar = async (e)=>{
    e.preventDefault();
    setError(null);
    try {
      const resultado = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (resultado.error) {
        setError(resultado.error.message);
      } else {
        // El inicio de sesión fue exitoso, puedes redirigir al usuario a otra página.
        console.log('Registro exitoso', email);
        // router.push('/')
      }
    } catch (error) {
      console.error('Error al registrarse', error.message);
      setError(error.message);
    }
  }
  return (
    <form onSubmit={registro ? registrar : handleLogin} className='flex gap-4 flex-wrap w-full'>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input
                                        isClearable
                                        type="text"
                                        label="Usuario"
                                        variant="bordered"
                                        placeholder=""
                                        onClear={() => console.log("input cleared")}
                                        className="max-w-xs text-black"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input
                                        label="Password"
                                        variant="bordered"                                        
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? "text" : "password"}
                                        className="max-w-xs text-black"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    {registro?
                                    (
                                        <p className='text-black' onClick={()=>setRegistro(false)}>Iniciar sesion</p>
                                        ):(
                                            <p className='text-black' onClick={()=>setRegistro(true)}>Registrarse</p>
                                    )}
                                </div>

                                <Button type="submit" color="primary">
                                    {registro? "Registrar" : "Iniciar"}
                                </Button>
                            </form>
  )
}

export default FormLogin