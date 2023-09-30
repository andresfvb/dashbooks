import React, { useEffect, useContext, useState } from 'react';
import Layouts from '../components/Layouts'
import Footer from '../components/Footer';
import CountBooks from '../components/graphics/counting/CountBooks';
import styles from '@/styles/dashboard/index.module.css'
import BooksContext from '../context/books/booksContext';
import { Card } from "@nextui-org/react";

import supabase from './api/auth/[...auth]';
import UserContext from '../context/login/userContext';
import FrameHome from '../components/frame/FrameHome';
import BestUser from '../components/tables/BestUser';
import BestBook from '../components/tables/BestBook';
import MyBestBook from '../components/tables/MyBestBook';
import ReactLoading from 'react-loading';

const index = () => {
    const {dataUser,getDatos} = useContext(UserContext)
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [booksOcu, setBooksOcu] = useState([]);
    let datos = []
    useEffect(()=>{
        getDatos()
    },[])
    useEffect(()=>{
        async function fetchBooks(){
            const {data, error} =  await supabase.from('books').select('*');
            if (error) {
                console.error("Error fetching books:", error);
            } else {
                
                setBooks(data);
                setLoading(false)
            }
        }
        fetchBooks()
    },[])
    
    if (loading) {
        return (<div className='flex w-full items-center justify-center'><ReactLoading type={"spin"} color={"#002D61"} height={"100%"} width={"8%"} /></div>)
    }
    console.log(books)
    const disponible = books.filter((element, index) => {element.available === true})
    const ocupado = books.filter((element, index) => {element.available === false})
    const total = books.length
    if(dataUser.role === 'Usuario'){
        datos = [
            { id: 1, name: 'Libros prestados total', tamaño: books.length, color: 'bg-blue-500' },
            { id: 2, name: 'Libros devueltos', tamaño: books.length, color: 'bg-green-500' },
            { id: 3, name: 'Libros sin devolución', tamaño: books.length, color: 'bg-red-500' }
        ]
    }else{
        datos = [
            { id: 1, name: 'Libros totales', tamaño: total, color: 'bg-blue-500' },
            { id: 2, name: 'Libros disponibles', tamaño: disponible, color: 'bg-green-500' },
            { id: 3, name: 'Libros prestados', tamaño: ocupado, color: 'bg-red-500' }
        ]
    }
    return (
        <>
            <Layouts
                title={'Home'}
                description={'Esta es la pagina de inicio'}
            >

                <h1 className='text-large mb-2'>DashBoard</h1>
                <div className='flex flex-col gap-10'>
                <div className={`${styles.sectionFirst} sm:flex-col`}>
                    <div className={styles.information}>
                        <h4 className='text-small'>Recien llegado</h4>
                        <p className='text-medium'>{books[books.length-1].title}</p>
                    </div>
                    <div className="lg:grid lg:grid-cols-3 sm:flex sm:flex-col w-full gap-10 bg-transparent">
                        <CountBooks
                            datos={datos}
                        />
                    </div>
                    
                </div>
                {
                    dataUser.role === 'Usuario'? (
                        <div className='flex flex-row justify-between gap-10 w-full'>
                            <div className='flex w-full'>
                                    {
                                         <FrameHome TableBook={MyBestBook} vl={3}/>
                                    }
                            </div>
                           
                        </div>
                    ):(
                        <div className='flex flex-row justify-between gap-10'>
                            <div className='flex w-1/2'>
                                    {
                                        dataUser.role !== "Usuario" ? <FrameHome TableBook={BestBook} vl={1}/>:''
                                    }
                            </div>
                            <div className='flex w-1/2'>
                                    {
                                        dataUser.role !== "Usuario" ? <FrameHome TableBook={BestUser} vl={2}/>:''
                                    }
                            </div>
                        </div>
                    )
                }
                
                
                </div>
            </Layouts>
        </>
    )
}

export default index