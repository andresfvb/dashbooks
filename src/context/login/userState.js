import { useEffect, useReducer } from 'react'
import userReducer from './userReducer'
import axios from 'axios'
import UserContext from './userContext'
import { supabase } from '@/src/pages/api/auth/[...auth]'


const UserState = (props) => {
    const initialState = {
        dataUser: '',
    }
    const [state, dispatch] = useReducer(userReducer, initialState)
    const getRol = (rol) => {
        try {
            dispatch({
                type: 'GET_USER',
                payload: rol,
            })
        } catch (error) {
            console.error(error);
        }
    }
    const getDatos = async()=>{
        const {data} = await supabase.auth.getUser()
        try {
            if(data.user.role === "authenticated"){
                data.user.role = "Usuario"
            }
            dispatch({
                type: 'GET_USER',
                payload: data.user,
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <UserContext.Provider
            value={{
                dataUser: state.dataUser,
                getDatos
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState