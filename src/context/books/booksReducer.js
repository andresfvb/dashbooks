import React from 'react'
import { GET_BOOKS, GET_BOOKS_USER } from '../type'

export default (state, action) => {
    const { payload, type, email } = action

    switch (type) {
        case GET_BOOKS:
            return {
                ...state,
                books: payload,
            }
        case GET_BOOKS_USER:
            let value = []
            payload.length > 0 ? (
            payload.forEach(dato =>{
                if(dato.user === email)
                    value.push(dato)
            })
            ):('')
            return {
                ...state,
                booksUser: value,
            }
        default:
            return state
            break;
    }

}