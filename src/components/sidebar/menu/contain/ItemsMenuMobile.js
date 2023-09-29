import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '@/styles/sidebar/itemsMenu.module.css'
import { useRouter } from 'next/router';
import supabase from '@/src/pages/api/auth/[...auth]';
import Cookies from 'js-cookie';
import { Button } from '@nextui-org/react';
import UserContext from '@/src/context/login/userContext';

const ItemsMenuMobile = () => {
    const router = useRouter();
    const { dataUser } = useContext(UserContext)
    const [st, setSt] = useState('')
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            // El cierre de sesión fue exitoso, redirige al usuario a la página de inicio o a donde desees.
            Cookies.remove('supabaseSession');
            Cookies.remove('rol');
            Cookies.remove('email');

            router.push('/login');
        } else {
            console.error('Error al cerrar sesión', error.message);
        }
    };

    const paginas = [
        { id: 1, path: '/', name: 'Dashboard' },
        { id: 2, path: '/booksList', name: 'Libros' },
        // { id: 3, path: '/login', name: 'Login' },
    ]


    return (
        <div className={`flex flex-col gap-5 ${styles.itemsMenu} `}>
            {
                paginas.map(elemento => (
                    <Link href={elemento.path} key={elemento.id} ><div className={`rounded py-5 pl-5 ${router.pathname === elemento.path ? 'bg-primary-100' : ' hover:bg-default-100 bg-transparent'}`}>{elemento.name}</div></Link>

                ))
            }
            {
                dataUser.role === 'Usuario' ? <Link href="/books"><div className={`rounded py-5 pl-5 ${router.pathname === "/books" ? 'bg-primary-100' : ' hover:bg-default-100 bg-transparent'}`}>Mis libros</div></Link> : ''
            }
            {/* {
                rol === 'Usuario'? :''
            }
             */}
            <Button onClick={handleLogout}><div className={`rounded py-5 pl-5 hover:bg-default-100 bg-transparent'}`}>Cerrar sesion</div></Button>
        </div>
    )
}

export default ItemsMenuMobile