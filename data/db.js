import allBooks from "./books";
import Books from "./booksUse";
class DataBase {
    async getAll() {
        return allBooks
    }

    async getById(id) {
        if (!allBooks.hasOwnProperty(id)) {
            return null
        }
        const entry = allBooks[id]
        return entry

    }

    async insertData(data) {
        const info = JSON.parse(data)
        info.id = allBooks.length + 1
        const search = allBooks.find(element => element.codLibro === info.codLibro)
        if (search) {
            return 'No es posible'
        } else {
            allBooks.push(info)
            return allBooks.find(element => element.numero_id === info.numero_id)
        }
    }

    async updateData(data) {
        const info = JSON.parse(data)
        const dataNueva = allBooks.findIndex(element => element.codLibro === info.codLibro)
        allBooks[dataNueva] = info
        return allBooks.find(element => element.numero_id === info.numero_id)

    }
    async deleteData(data) {
        const info = JSON.parse(data)
        const dataNueva = allBooks.findIndex(element => element.codLibro === info.codLibro)
        allBooks.splice(dataNueva, 1)
        return allBooks.find(element => element.numero_id === info.numero_id)

    }
    async bookOcupation(data){
        const info = JSON.parse(data)
        Books.push(info)
        const dataNueva = allBooks.findIndex(element => element.codLibro === info.codLibro)
        allBooks[dataNueva].state = info.state
        return allBooks.filter(element => info.user === element.user)
    }
    async getBookOcupation(){
        return Books
    }
    async deleteBookOcupation(data){
        const info = JSON.parse(data)
        allBooks[dataNueva].state = 'disponible'
        const dataNueva = Books.findIndex(element => element.codLibro === info.codLibro)
        allBooks.splice(dataNueva, 1)
        return allBooks.find(element => element.numero_id === info.numero_id)
    }
}

export default DataBase
