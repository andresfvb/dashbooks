import React, { useContext, useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import UserContext from '@/src/context/login/userContext';
import supabase from '@/src/pages/api/auth/[...auth]';

const BestBook = () => {
  const {dataUser} = useContext(UserContext)
  const [books, setBooks] = useState([]);
  const [booksOcupated, setBooksOcupated] = useState([]);
  const [replay, setReplay] = useState()
  useEffect(()=>{
    async function fetchBooks() {
      const { data, error } = await supabase.from('books').select('*');
      if (error) {
        console.error("Error fetching books:", error);
      } else {
        bookInfo(data);
      }
    }
  
    async function bookInfo(value) {
      const { data, error } = await supabase.from('loans').select('*');
      if (error) {
        console.error("Error fetching books:", error);
      } else {
        setBooksOcupated(data);
      }
      const promises = value.map(async (book) => {
        const value = booksOcupated.filter(e=>e.book_id === book.id).length
        if(value!=0){
          books.push({title:book.title, cant:value})
        }
        // setBooks({title:book.title, cant:value})
      });
      try {
        const resolvedBooks = await Promise.all(promises);
      } catch (err) {
        console.error("Error resolving promises:", err);
      } finally {
        console.log("Cargado")
setReplay("hla")
      }
    }
  
    fetchBooks();
},[replay])


  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Libro</TableColumn>
        <TableColumn>Solicitudes</TableColumn>
      </TableHeader>
      <TableBody>
      {
        books.map((element, index)=>(
          <TableRow key={index}>
            <TableCell>{element.title}</TableCell>
            <TableCell>{element.cant}</TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  )
}

export default BestBook