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
    const [cargar, setCargar] = useState({ name: '', genero: '', author: '', cod: '', id: '',avatar: '' })
    let datos = []
    useEffect(()=>{
        fetchBooks()
        fetchBooksAdmin()
    },[])

    async function fetchBooksAdmin(){
        const {data, error} =  await supabase.from('books').select('*')
        if (error) {
            console.error("Error fetching books:", error);
        } else {
            setCargar({ name: 's', genero: '', author: '', cod: '', id: '',avatar: '' })
            setBooks(data);
            setLoading(false)
        }
    }

        async function fetchBooks(){
            const {data, error} =  await supabase.from('loans').select('*').eq("user_id", dataUser.id);
            if (error) {
                console.error("Error fetching books:", error);
            } else {
                setCargar({ name: 's', genero: '', author: '', cod: '', id: '',avatar: '' })
                setBooksOcu(data);
                setLoading(false)
            }
        }
        
 
    
    if (loading) {
        return (<div className='flex w-full items-center justify-center'><ReactLoading type={"spin"} color={"#002D61"} height={"100%"} width={"8%"} /></div>)
    }
    const disponiblez = books.filter((element, index) => element.available === true)
    const ocupado = books.filter((element, index) => element.available === false)

    const total = books.length
    if(dataUser.role === 'Usuario'){
        datos = [
            { id: 1, name: 'Libros prestados total', tamaño: books.length, color: 'bg-blue-500' },
        ]
    }else{
        datos = [
            { id: 1, name: 'Libros totales', tamaño: total, color: 'bg-blue-500' },
            { id: 2, name: 'Libros disponibles', tamaño: disponiblez.length, color: 'bg-green-500' },
            { id: 3, name: 'Libros prestados', tamaño: ocupado.length, color: 'bg-red-500' }
        ]
    }
    return (
        <>
            <Layouts
                title={'Home'}
                description={'Esta es la pagina de inicio'}
            >

                <h1 className='text-large mb-2'>DashBoard</h1>
                <div className='flex flex-row justify-around items-center gap-10'>
                {
                    dataUser.role === 'Usuario'?(''):(
                        <div className={`${styles.sectionFirst} sm:flex-col lg:flex-col`}>
                    <div className={styles.information} >
                        <h4 className='text-small'>Recien llegado</h4>
                        {
                            dataUser.role === 'Usuario'?(
                                <p className='text-medium'>{books[books.length-1].title}</p>
                            ):(
                                <p className='text-medium'>{books[books.length-1].title}</p>
                            )
                        }
                        
                    </div>
                    <div className="lg:grid lg:grid-cols-3 sm:flex sm:flex-col w-full gap-10 bg-transparent">
                        <CountBooks
                            datos={datos}
                        />
                    </div>
                    
                </div>
                    )
                }
                
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
                            <div className='flex'>
                                    {
                                        dataUser.role !== "Usuario" ? <FrameHome TableBook={BestBook} vl={1}/>:''
                                    }
                            </div>
                            {/* <div className='flex w-1/2'>
                                    {
                                        dataUser.role !== "Usuario" ? <FrameHome TableBook={BestUser} vl={2}/>:''
                                    }
                            </div> */}
                        </div>
                    )
                }
                
                
                </div>
            </Layouts>
        </>
    )
}

export default index