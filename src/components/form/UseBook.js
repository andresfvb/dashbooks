import React, { useContext } from 'react'
import { Card,Button, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"
import Cookies from 'js-cookie'
import { supabase } from '@/src/pages/api/auth/[...auth]'
import UserContext from '@/src/context/login/userContext'
import { operation } from '@/src/functions/fechaActual'

const UseBook = ({carga, onClose, setCarga}) => {
    const {dataUser} = useContext(UserContext)

    const prestar = async (e) => {
        setCarga({ name: '', editorial: '', author: '', cod: '', id: '', avatar:'' })
        const op = new operation
        const fecha  = op.sacarFecha()
        const fechaAtras = op.sacarFechaAtras()
        const formData = {
            book_id: carga.cod,
            user_id: dataUser.id,
            borrow_date: fecha,
            return_date: fechaAtras
            
        }
        console.log(formData)
        const { data, error } = await supabase
            .from("loans")
            .insert([formData]);
            if (error) {
                console.error("Error al insertar datos:", error);
              } else {
                console.log("Datos insertados exitosamente:", data);
                actualizarRegistro(carga.cod)
                setCarga({ name: '',  author: '', cod: '', id: '', avatar:'' })
              }
              
        
    }
    async function actualizarRegistro(id_book) {
        try {
          // Reemplaza "mi_tabla" con el nombre de tu tabla y "id" con el ID del registro que deseas actualizar.
          const { data, error } = await supabase
            .from("books")
            .update({available:false})
            .eq("id", id_book);
      
          if (error) {
            console.error("Error al actualizar el registro:", error.message);
          } else {
            console.log("Registro actualizado con éxito:", data);
          }
        } catch (error) {
          console.error("Error inesperado:", error.message);
        }
      }
  return (
    <div>
        <Card className=''>
                                        <CardBody className='flex flex-row gap-5 justify-around items-center'>
                                            <div>
                                                <Image src={carga.avatar} width={200} height={200}/>
                                            </div>
                                            <div className='flex flex-col gap-y-8'>
                                                <h1 className='text-medium'>{carga.name}</h1>
                                                <div>
                                                <p>Autor:</p><p>{carga.author}</p>

                                                </div>
                                                
                                                <div>
                                                <p>Estado:</p><p>{carga.state === true ? "Disponible":"Ocupado"}</p>

                                                </div>
                                                <div>
                                                <Button onPress={onClose}  className="w-full" color="success" variant="ghost" onClick={()=>prestar()}>
                                                    Solicitar
                                                </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                        </Card>
    </div>
  )
}

export default UseBook
