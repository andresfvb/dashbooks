import React from 'react'
import { Html, Head, Main, NextScript } from "next/dist/pages/_document"

const _document = () => {

    return (
        <Html className='dark'>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600;700;900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap" rel="stylesheet" />
            </Head>
            <body className='sidebar-expanded mt-40'>

                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default _document