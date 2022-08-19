import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Login from './../Login'

const PrivateRoute = ({ component: children}) => {
  return(
    <>
        {sessionStorage.getItem("username") ? children : <Login />}
    </>
)}

export default PrivateRoute