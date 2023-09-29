import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react"


const FrameHome = ({TableBook, vl}) => {
  let value = 1
  if(vl===2){
    value = "Ranking estudiantes"
  }else if(vl ===3){
    value = "Mis mejores libros"
  }else{
    value = "Libros mas solicitados"
  }
  return (
    <Card className='w-full'>
            <CardHeader className='py-5 pl-6 justify-between'>
                <h4 className="text-medium">{value}</h4>
            </CardHeader>
            <Divider />
            <CardBody>
                <TableBook/>
            </CardBody>
    </Card>
  )
}

export default FrameHome