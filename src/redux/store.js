import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import clientReducer from './clientSlice'
import appReducer from './appSlice'


const store = configureStore({
    reducer:{
        auth:authReducer,
        client:clientReducer,
        app:appReducer,
    }
})
export default store



