import allUsers from "./users"
import userLogin from "./login"

class DataBaseUsers {
    async getAll() {
        return userLogin
    }

    async login(data) {
        const info = JSON.parse(data)

        const search = allUsers.findIndex(element => element.nameUser === info.name)
        if (search < 0) {
            return ''
        } else {
            const valid = allUsers[search].contraseña === info.password
            if (!valid) {
                return ''
            }
            userLogin.push(allUsers[search])
            userLogin[0].login = true
            return 'Usuario Logueado'
        }
    }
    async loginPrev(data) {
        const info = JSON.parse(data)
        console.log(info)
        const search = allUsers.findIndex(element => element.nameUser === info.name)
        if (search < 0) {
            return ''
        } else {
            userLogin.push(allUsers[search])
            userLogin[0].login = true
            return 'Usuario Logueado'
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
}

export default DataBaseUsers
