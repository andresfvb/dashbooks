import React, { useContext } from 'react'
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
 
  
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isRegisterMessageVisible, setRegisterMessageVisible] = useState(false);
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
  
          setSuccessMessageVisible(true); // Mostrar el mensaje de éxito
          setTimeout(() => {
            setSuccessMessageVisible(false); // Ocultar el mensaje después de unos segundos
          }, 5000); // Ocultar después de 5 segundos (ajusta el tiempo según tus preferencias)

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
        setSuccessMessageVisible(true); // Mostrar el mensaje de éxito
          setTimeout(() => {
            setSuccessMessageVisible(false); // Ocultar el mensaje después de unos segundos
          }, 5000);
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
                                        className="w-full text-black"
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
                                        className="w-full text-black"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                               {isSuccessMessageVisible && (
        <div className="success-message bg-green-300 rounded-md">
          ¡Inicio de sesión exitoso!
          <button onClick={() => setSuccessMessageVisible(false)}>Cerrar</button>
        </div>
      )}
      {isRegisterMessageVisible && (
        <div className="success-message text-white p-3 bg-green-300 rounded-md">
          <p>¡Registro exitoso!</p>
          <p>Se ha enviado un link a su correo electronico</p>
          <button onClick={() => setRegisterMessageVisible(false)}>Cerrar</button>
        </div>
      )}
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    {registro?
                                    (
                                        <p className='text-black' onClick={()=>setRegistro(false)}>Iniciar sesion</p>
                                        ):(
                                            <p className='text-black' onClick={()=>setRegistro(true)}>Registrarse</p>
                                    )}
                                </div>
<div className='flex w-full justify-center items-center'>
<Button type="submit" color="primary" className='w-1/2'>
                                    {registro? "Registrar" : "Iniciar"}
                                </Button>
</div>
                                
                            </form>
  )
}

export default FormLogin