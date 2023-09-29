import React from 'react'
import { GET_USER } from '../type'

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case GET_USER:
            return {
                ...state,
                dataUser: payload,
            }
        default:
            return state
            break;
    }

}