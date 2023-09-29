import React, { useEffect, useContext, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button } from "@nextui-org/react";
import BooksContext from '@/src/context/books/booksContext';
import { EditIcon } from '@/public/image/Editcon';
import { DeleteIcon } from '@/public/image/DeleteIcon';
import { supabase } from '@/src/pages/api/auth/[...auth]';
import { EyeIcon } from '@/public/image/EyeIcon';
import styles from '@/styles/tablesBooksUser.module.css'
import ReactLoading from 'react-loading';

const TablesBooksUsers = ({ setCarga, onOpen, setEdicion, carga }) => {
    const [habilitar, setHabilitar] = useState('')
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const seleccionar = (item) => {
        setEdicion(true)
        setCarga(item)
        onOpen()
    }
    const statusColorMap = {
        true: "success",
        false: "danger",
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
                        {cellValue === true?"Disponible":"Ocupado"}
                    </Chip>
                );
            case "editorial":
                return (
                    <div className="flex flex-col">
                        <p className="capitalize" >
                            {cellValue}
                        </p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-5">
                        <Tooltip content="Solicitar">
                            <span className="text-medium text-default-400 cursor-pointer active:opacity-50" onClick={() => seleccionar(user)}>
                                <EyeIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    // const { books, getAllBooks } = useContext(BooksContext)
    // useEffect(() => {
    //     getAllBooks()
    // }, [carga])
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
            uid: 'author',
            label: "Autor"
        },
        {
            uid: 'state',
            label: "Disponibilidad"
        },
        {
            uid: 'actions',
            label: "Acciones"
        }
    ];
    let rows = []
    useEffect(()=>{
        async function fetchBooks(){
            setLoading(true);
        rows = []
            const { data, error } = await supabase.from('books').select('*');
            if (error) {
                console.error("Error fetching books:", error);
            } else {
                setBooks(data);
                setLoading(false);
            }
        }
        fetchBooks()
    },[carga])
    if (loading) {
        return (<div className='flex w-full items-center justify-center'><ReactLoading type={"spin"} color={"#002D61"} height={"100%"} width={"8%"} /></div>)
    }
    books.forEach((element, index) => {
        rows.push({ id: index+1, cod: element.id, name: element.title, author: element.author,  state: element.available, avatar: element.cover_image_url })
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
                            <TableRow className={`text-small ${item.state === false ? styles.quitar:"dejar"}`} key={item.id} >
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
        </Table>
    )
}

export default TablesBooksUsers