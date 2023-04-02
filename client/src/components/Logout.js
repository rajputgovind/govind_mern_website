import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes'
import { UserContext } from '../App';

const Logout = () => {
    const {state, dispatch} = useContext(UserContext)
    const history  = useNavigate()
    useEffect(()=>{
        fetch('/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        .then((res)=>{
            
            if(res.status===StatusCodes.OK){
                // alert("logout successfullu")
                dispatch({type:"USER", payload:false})
                history("/login", {replace:true});
            }

        })
        .catch((error)=>{
            // alert("please login first")
            console.log(error)
        })
    })

  return (
    <>
        <h1>this is a logout page</h1>
    </>
  );
}

export default Logout;
