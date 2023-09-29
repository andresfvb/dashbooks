import React, { useEffect } from 'react'
import BooksUse from '../components/tables/BooksUse'
import Layouts from '../components/Layouts'
import Frame from '../components/frame/Frame'
import { supabase } from './api/auth/[...auth]'
const Books = ({rolLog}) => {

    return (
        <>
            <Layouts
                title={'Libros'}
                description={'Esta es la pagina de libros'}
            >
                <div>
                    <h1 className='text-large mb-2'>Libros prestados</h1>
                </div>
                <div className='flex'>
                    <Frame
                        title='DashLibros'
                        Component={BooksUse}
                        rol={rolLog}
                    />
                </div>

            </Layouts>
        </>
    )
}

export default Books