import React, { useEffect, useContext, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue, Button, SelectItem } from "@nextui-org/react";
import BooksContext from '@/src/context/books/booksContext';
import { EditIcon } from '@/public/image/Editcon';
import { DeleteIcon } from '@/public/image/DeleteIcon';
import { supabase } from '@/src/pages/api/auth/[...auth]';
import { EyeIcon } from '@/public/image/EyeIcon';
import ReactLoading from 'react-loading';

const TablesBooks = ({ setCarga, onOpen, setEdicion, carga }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const actualizar = (item) => {
        setEdicion(true)
        setCarga(item)
        onOpen()
    }
    const eliminar = async (item) => {

            try {
              // Reemplaza "mi_tabla" con el nombre de tu tabla y "id" con el ID del registro que deseas eliminar.
              console.log(item)
              const { data, error } = await supabase
                .from("books")
                .delete()
                .eq("id", item.cod);
          
              if (error) {
                console.error("Error al eliminar el registro:", error.message);
              } else {
                console.log("Registro eliminado con éxito:", data);
              }
            } catch (error) {
              console.error("Error inesperado:", error.message);
            }
          
        setCarga({ name: '', editorial: '', author: '', cod: '', id: '', avatar:'' })
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
            case "actions":
                return (
                    <div className="relative flex items-center gap-5">
                        <Tooltip content="Edit user">
                            <span className="text-medium text-default-400 cursor-pointer active:opacity-50" onClick={() => actualizar(user)}>
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-medium text-danger cursor-pointer active:opacity-50" onClick={() => eliminar(user)}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
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
        setLoading(true);
        rows = []
        async function fetchBooks(){
            const {data, error} =  await supabase.from('books').select('*');
            
            console.log(data)
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
                            <TableRow className={`text-small ${item.state === 'false' ? styles.quitar:"dejar"}`} key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
        </Table>
    )
}

export default TablesBooks