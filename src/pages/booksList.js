import React, { useEffect, useContext, useState } from 'react'
import Layouts from '../components/Layouts'
import styles from '@/styles/registerStudents.module.css'
import Frame from '../components/frame/Frame'
import TablesBooks from '../components/tables/TablesBooks'
import { supabase } from '@/src/pages/api/auth/[...auth]';
import TablesBooksUsers from '../components/tables/TablesBooksUser'
import UserContext from '../context/login/userContext'

const RegisterBooks = () => {
    const {dataUser} = useContext(UserContext)

    const [cargar, setCargar] = useState({ name: '', genero: '', author: '', cod: '', id: '',avatar: '' })
    return (
        <>
            <Layouts
                title={'Libros'}
                description={'Lista de libros'}
            >
                <div>
                    <h1 className='text-large mb-2'>Lista de Libros</h1>
                </div>
                <div className='flex'>
                    <Frame
                        title='DashLibros'
                        Component={ dataUser.role !== "Usuario" ? TablesBooks : TablesBooksUsers}
                        carga={cargar}
                        setCarga={setCargar}
                    />
                </div>

            </Layouts>

        </>
    )
}

export default RegisterBooks