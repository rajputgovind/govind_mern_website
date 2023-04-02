import { StatusCodes } from 'http-status-codes';
import React, { useState, useContext } from 'react';
import { MdEmail, MdPassword } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
const Login = () => {
   const {state, dispatch} = useContext(UserContext);

  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  // const handleChange = (e)=>{

  // }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },

      body: JSON.stringify({
        email, password
      })
    })
    const data =await response.json()
    // console.log(response)
    // console.log(data)
    if (response.status === StatusCodes.CREATED ) {
      // console.log("login")
      dispatch({type:"USER", payload:true})
      window.alert("login successful")
      history("/")
    }
    else {
      window.alert("Invalid Credentials")
      console.log("error in login")

    }
  }
  return (
    <>
      <div className='container my-5'>
        <div className='row mt-5'>
          <div className='col-lg-6 col-sm-10 col-md-4 d-flex align-items-center justify-content-center '>
            <figure>
              <img src="../Images/login.jpg" alt="login image" />
            </figure>


          </div>


          <div className='col-lg-6 col-sm-10 col-md-4 '>
            <div className="alert alert-light " role="alert">
              <h1 className='mt-3 text-center'>Sign In</h1>
            </div>
            <form method='POST' onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <MdEmail /> <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" name='email' value={email} id="email" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
              </div>


              <div className="form-group mb-3">
                <MdPassword /> <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={password} id="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className='mt-4 form-group'>
                <input type="submit" name="signup" id="signin" className='btn btn-primary' value="Login" />
              </div>
            </form>
            <div className='mt-4'>
              <NavLink to='/signup' className="d-block" >Create an Account</NavLink>

            </div>
          </div>
        </div>

      </div>
      <br /><br /><br /><br />


    </>
  );
}

export default Login;
