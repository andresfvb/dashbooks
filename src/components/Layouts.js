import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
const Layouts = ({ children, title = '', description = '' }) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{`DS - ${title}`}</title>
                <meta name='description' content={description}></meta>
            </Head>
            {
                router.pathname !== '/login' ? (
                    <div key="1" className="flex flex-col py-14 px-24 w-full lg:mt-0  mt-40">
                        {children}
                    </div>
                ) : (
                    <div key="2" className='w-full flex justify-center items-center h-screen bg-white'>
                        {children}

                    </div>
                )
            }

        </>
    )
}

export default Layouts