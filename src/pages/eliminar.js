import React, { useContext, useEffect } from 'react'
import { Card,Button, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"
import Cookies from 'js-cookie'
import supabase from '@/src/pages/api/auth/[...auth]'
import UserContext from '@/src/context/login/userContext'
import { operation } from '@/src/functions/fechaActual'

const eliminar = () => {
    const {dataUser} = useContext(UserContext)
    const prestar = async (e) => {
        const { data, error } = await supabase
            .from("loans")
            .update().eq("id", 5);

            
            if (error) {
                console.error("Error al insertar datos:", error);
              } else {
                console.log("Datos insertados exitosamente:", data);

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
      useEffect(()=>{
        prestar()
      },[])
  return (
    <div>eliminar</div>
  )
}
export default eliminar