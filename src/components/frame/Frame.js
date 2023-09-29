import React, { useContext, useState } from 'react'
import styles from '@/styles/frame/frame.module.css'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import FormRegister from '../form/formRegister';
import BooksContext from '@/src/context/books/booksContext';
import { nanoid } from 'nanoid'
import UseBook from '../form/UseBook';
import UserContext from '@/src/context/login/userContext';

const Frame = ({ Component, title, carga, setCarga, rol }) => {
    const [edicion, setEdicion] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { books } = useContext(BooksContext)
    const {dataUser} = useContext(UserContext)
    return (
        <Card className='w-full'>
            <CardHeader className='py-5 pl-6 justify-between'>
                <h4 className="text-medium">{title}</h4>
                
                {dataUser.role !== 'Usuario' ? <Button onPress={onOpen}>Registrar Libro</Button>:''}
            </CardHeader>
            <Divider />
            <CardBody>
                <Component carga={carga} onOpen={onOpen} setEdicion={setEdicion} setCarga={setCarga} />
            </CardBody>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} className='flex max-w-5xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            
                            {
                                dataUser.role === 'Usuario' ? (
                                    <>
                            
                                    <ModalBody className={`p-14 w-full bg-[url('${carga.avatar})]' bg-cover bg-center`}>
                                    
                                    <UseBook carga={carga} onClose={onClose} setCarga={setCarga} />
                            </ModalBody>
                            </>
                                ):(
                                    <>
                                    <ModalHeader className="flex flex-col gap-1">{edicion ? "Actualizar" : "Registrar libro"}</ModalHeader>
                                    <ModalBody className='p-14 w-full'>
                                {
                                    edicion ? (
                                        <FormRegister
                                            title='Actualizar datos'
                                            Component={FormRegister}
                                            setCarga={setCarga}
                                            onClose={onClose}
                                            edicion={edicion}
                                            setEdicion={setEdicion}
                                            method="PUT"
                                            datos={books}
                                            carga={carga}
                                        />
                                    ) : (
                                        <FormRegister
                                            title='Información Basica'
                                            Component={FormRegister}
                                            setCarga={setCarga}
                                            onClose={onClose}
                                            edicion={edicion}
                                            setEdicion={setEdicion}
                                            id={nanoid(8)}
                                            carga={carga}
                                        />
                                    )
                                }

                            </ModalBody>
                            </>
                                )
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card >
    )
}

export default Frame