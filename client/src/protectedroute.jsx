import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, useLocation} from "react-router-dom"


const Protectedroute = ({children}) => {
   
    let location = useLocation();
    const user = useSelector((state)=>state.user);
    if(!user.state.isAuthenticated){
        return <Navigate to="/login" state={{ from: location}} replace />
    }
  return (
    children
  )
}

export default Protectedroute