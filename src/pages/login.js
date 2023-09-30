import React, { useContext, useEffect, useState } from 'react'
import Layouts from '../components/Layouts'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from '@/public/image/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/public/image/EyeSlashFilledIcon';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react"
import Image from 'next/image';
import UserContext from '../context/login/userContext';
import FormLogin from '../components/form/FormLogin';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = React.useState(false);
    const [registro, setRegistro] = useState(false)
    const [status, setStatus] = useState(null)
    const [usuario, setUsuario] = useState('')

    return (
        <>
            <Layouts
                title={'Login'}
                description={'Inicio sesion'}
            >
                <Card className='bg-white w-1/2 p-10'>
                    <CardHeader className="flex gap-3">
                            <Image src="/image/Logo-db.png" width={50} height={50} alt="Logotipo" radius="sm" />
                            <div className="flex flex-col">
                                <p className="text-default-500 "><b>DashBooks</b></p>
                                <p className="text-small text-default-500">La Biblioteca a tu <b>Alcance</b></p>
                            </div>
                       
                        

                    </CardHeader>
                    <Divider />
                    <CardBody className='flex flex-row justify-center items-center'>
                        <div className='lg:w-1/2 lg:flex hidden'>
                    <Image className="w-screen" src="/image/background.svg" width={100} height={100} alt="Imagen del login" />

                        </div>
                        <div className='formulario flex flex-col p-10 justify-center items-center lg:w-1/2 w-full'>
                            <div className='text-black mb-4 w-full flex flex-col'>
                                <span className='text-small'>Conectate</span>
                                <h1 className='text-large'>{registro?"Registrarse":"Iniciar Sesion"}</h1>
                            </div>
                            <div className=' w-full flex '>
                                <FormLogin registro={registro} setRegistro={setRegistro} router={router}/>
                            </div>
                        </div>
                    </CardBody>
                    
                </Card>
            </Layouts>
        </>
    )
}

export default Login