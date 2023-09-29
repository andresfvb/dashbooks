import React, { useEffect, useContext, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button } from "@nextui-org/react";
import BooksContext from '@/src/context/books/booksContext';
import { EditIcon } from '@/public/image/Editcon';
import { DeleteIcon } from '@/public/image/DeleteIcon';
import { supabase } from '@/src/pages/api/auth/[...auth]';
import { EyeIcon } from '@/public/image/EyeIcon';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';
import UserContext from '@/src/context/login/userContext';

const BooksUse = ({ onOpen, setEdicion, carga, setCarga }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {dataUser} = useContext(UserContext)
    async function entregar(item) {
        try {
          // Reemplaza "mi_tabla" con el nombre de tu tabla y "id" con el ID del registro que deseas actualizar.
          const { data, error } = await supabase
            .from("books")
            .update({available:true})
            .eq("id", item.cod);
      
          if (error) {
            console.error("Error al actualizar el registro:", error.message);
          } else {
            console.log("Registro actualizado con éxito:", data);
          }
        } catch (error) {
          console.error("Error inesperado:", error.message);
        }
      }
    const statusColorMap = {
        disponible: "success",
        ocupado: "danger",
    };
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "cod":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>

                    </div>
                );
            case "author":
                return (
                    <div className="flex flex-col">
                        <p className="capitalize" >
                            {cellValue}
                        </p>
                    </div>
                );
            case "state":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.state]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "fechaIn":
                return (
                    <div className="flex flex-col">
                        <p className="capitalize" >
                            {cellValue}
                        </p>
                    </div>
                );
            case "fechaOut":
                return (
                    <div className="flex flex-col">
                        <p className="capitalize" >
                            {cellValue}
                        </p>
                    </div>
                );
            case "actions":
                return (
                    <div className="flex flex-col">
                        <p className="capitalize" >
                            <Button color="success" variant="ghost" onClick={()=>entregar(user)}>Entregar</Button>
                        </p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const columns = [
        {
            uid: 'id',
            label: "#"
        },
        {
            uid: 'cod',
            label: "Codigo"
        },
        {
            uid: 'name',
            label: "Libro"
        },
        {
            uid: 'fechaIn',
            label: "Fecha prestamo"
        },
        {
            uid: 'fechaOut',
            label: "Fecha entrega"
        },
        {
            uid: 'actions',
            label: "Acciones"
        }
    ];
    let rows = []
    useEffect(() => {
        setLoading(true);
        async function fetchBooks() {
          const { data, error } = await supabase.from('loans').select('*').eq("user_id", dataUser.id);
          if (error) {
            console.error("Error fetching books:", error);
          } else {
            bookInfo(data);
          }
        }
      
        async function bookInfo(value) {
          const promises = value.map(async (book) => {
            const { data, error } = await supabase.from('books').select('*').eq("id", book.book_id);
            if (error) {
              console.error("Error fetching books:", error);
            } else {
              return { ...book, avatar: data[0].cover_image_url, nameBook: data[0].title};
            }
          });
      
          try {
            const resolvedBooks = await Promise.all(promises);
            setBooks(resolvedBooks);
          } catch (err) {
            console.error("Error resolving promises:", err);
          } finally {
            setLoading(false);
          }
        }
      
        fetchBooks();
      }, [carga]);
    if (loading) {
        return (<div className='flex w-full items-center justify-center'><ReactLoading type={"spin"} color={"#002D61"} height={"100%"} width={"8%"} /></div>)
    }
    console.log(books)
    books.forEach((element, index) => {
        rows.push({ id: index+1, cod: element.book_id, name: element.nameBook, avatar: element.avatar, fechaIn: element.borrow_date, fechaOut: element.return_date})
    })
    return (
        <Table removeWrapper aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn className="text-medium" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
                    <TableBody emptyContent={"No hay libros registrados"} items={rows}>
                        {(item) => (
                            <TableRow className="text-small" key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
        </Table>
    )
}

export default BooksUse