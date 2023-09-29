import { useReducer } from 'react'
import booksReducer from './booksReducer'
import axios from 'axios'
import BooksContext from './booksContext'


const BooksState = (props) => {
    const initialState = {
        books: [],
        booksUser: []
    }
    const [state, dispatch] = useReducer(booksReducer, initialState)

    const getAllBooks = async () => {
        try {
            const url = await axios.get('api/books')
            const respuesta = await url.data
            dispatch({
                type: 'GET_BOOKS',
                payload: respuesta,
            })
        } catch (error) {
            console.error(error);
        }
    }
    const getAllBooksUser = async (email) => {
        try {
            const url = await axios.get(`api/users`)
            
            const respuesta = await url.data.user
           
            dispatch({
                type: 'GET_BOOKS_USER',
                payload: respuesta,email
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BooksContext.Provider
            value={{
                books: state.books,
                booksUser: state.booksUser,
                getAllBooks,
                getAllBooksUser
            }}
        >
            {props.children}
        </BooksContext.Provider>
    )
}

export default BooksState