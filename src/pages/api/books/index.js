import DataBase from "../../../../data/db";

const handler = async (request, response) => {
  const db = new DataBase()
  if (request.method === 'POST') {
    const lastUser = await db.insertData(request.body)
    return response.status(201).json({ user: lastUser })
  } else if (request.method === 'GET') {
    const allEntries = await db.getAll()
    return response.status(200).json(allEntries)
  } else if (request.method === 'PUT') {

    const allEntries = await db.updateData(request.body)

    return response.status(200).json(allEntries)
  } else if (request.method === 'DELETE') {
    const allEntries = await db.deleteData(request.body)
    return response.status(200).json(allEntries)
  }
  return response.status(400).json({ error: 'El metodo no existe' })
}


export default handler