import React, { useContext } from 'react'
import styles from '@/styles/graphics/countStudent.module.css'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import UserContext from '@/src/context/login/userContext';

const CountBooks = ({ datos }) => {
    const { dataUser } = useContext(UserContext)
    return (
        <>
            {
                datos.map((elemento) => (
                    <Card key={elemento.id} className={`flex flex-col w-full ${elemento.color}`}>
                        <CardHeader>
                            <h3 className='text-default-900'>{elemento.name}</h3>
                        </CardHeader>
                        <CardBody>
                            <p>{elemento.tamaño}</p>
                        </CardBody>
                    </Card>
                ))
            }
        </>

    )
}

export default CountBooks