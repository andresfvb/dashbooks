import React, { useState } from 'react'
import { Input } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent, Button, books } from "@nextui-org/react";
import supabase from '@/src/pages/api/auth/[...auth]';

const FormRegister = ({ setCarga, onClose, edicion, setEdicion, method, id, carga }) => {
    
    const [file, setFile] = useState()
    const submit = async (e) => {
        e.preventDefault();
        const formData = {
            title: e.target.name.value,
            author: e.target.author.value,
            cover_image_url: e.target.imagen.value,
            available: true
        }
        const { data, error } = await supabase
            .from("books")
            .insert([formData]);
            if (error) {
                console.error("Error al insertar datos:", error);
              } else {
                console.log("Datos insertados exitosamente:", data);
                setCarga({ name: '',  author: '', cod: '', id: '', avatar:'' })
              }
    }

    const actualizar = async (e) => {
        e.preventDefault()
        setCarga({ name: '',  author: '', cod: '', id: '', avatar:'' })
        setEdicion(false)
        const formData = {
            title: e.target.name.value,
            author: e.target.autor.value,
            cover_image_url:carga.imagen,
            available: carga.state
        }
        setEdicion(false)
        await fetch('api/books', {
            method: method,
            body: JSON.stringify(formData),
        })
    }
    return (
        <form action="" onSubmit={edicion ? actualizar : submit} className='flex gap-4 flex-wrap w-full'>

            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input isClearable type='text' name="name" label="Nombre del libro" variant="bordered" defaultValue={carga.name} />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input isClearable type='text' name="author" label="Autor" variant="bordered" defaultValue={carga.author} />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input isClearable type='text' name="imagen" label="Url Imagen" variant="bordered" defaultValue={carga.image} />
            </div>

            <Button onPress={onClose} className="flex w-full bg-black rounded justify-center text-white p-3 my-3" type="submit" color="primary" onClick={() => setEdicion(false)} >
                {edicion ? "Actualizar" : "Registrar"}
            </Button>
        </form>
    )
}

export default FormRegister