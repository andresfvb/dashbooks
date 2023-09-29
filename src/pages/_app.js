import React, { useContext, useEffect, useState } from 'react'

import { NextUIProvider } from "@nextui-org/react";

import '@/styles/globals.css'
import SideBar from '../components/sidebar/SideBar';
import BooksState from '../context/books/booksState';
import { useRouter } from 'next/router';
import supabase from '@/src/pages/api/auth/[...auth]';
import Cookies from 'js-cookie';
import UserContext from '../context/login/userContext';
import UserState from '../context/login/userState';
import ReactLoading from 'react-loading';

const MyApp = ({ Component, pageProps }) => {
    const router = useRouter();
    const [authInitialized, setAuthInitialized] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const sessionToken = Cookies.get('supabaseSession');
        if (!sessionToken) {
          router.push('/login');
         
            // supabase.auth.api.setAuth(sessionToken);
        }else{
            
        }
      }, [authInitialized]);
    
    
    return (
        <NextUIProvider>
            <UserState>
            <BooksState>
                
                {
                    router.pathname !== '/login' ? (
                        <div className="flex">
                            <SideBar/>
                            <Component {...pageProps}/>
                        </div>
                    ) : (
                        <Component {...pageProps} />
                    )
                }


            </BooksState>
            </UserState>
        </NextUIProvider>
    )
}

export default MyApp