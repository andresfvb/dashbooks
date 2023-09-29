import DataBase from "../../../../data/db";

const handler = async (request, response) => {
  const db = new DataBase()
  if (request.method === 'POST') {
    const lastUser = await db.bookOcupation(request.body)
    return response.status(201).json({ user: lastUser })
  }else if(request.method === 'GET') {
    const lastUser = await db.getBookOcupation(request.body)
    return response.status(200).json({ user: lastUser })
  }else if(request.method === 'DELETE') {
    const lastUser = await db.deleteBookOcupation(request.body)
    return response.status(200).json({ user: lastUser })
  }
  return response.status(400).json({ error: 'El metodo no existe' })
}


export default handler