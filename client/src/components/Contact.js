import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcIpad } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai"
import { IoMdPin } from "react-icons/io";
import { StatusCodes } from 'http-status-codes';

const Contact = () => {
  const history = useNavigate()
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    phone:"",
    message:""
  })

  const handleChange =(e)=>{
    const name = e.target.name
    const value = e.target.value

    setUserData({...userData,[name]:value})
  }

  const callContactPage=async ()=>{
    try {
      const response = await fetch('/contact',{
        method:"GET",
        headers:{
          // Accept:"application/json", (cookies ko accept karne ke liye)
          "Content-Type":"application/json"
        },
        // credentials:"include" (token bhejne ke liye)
      })

      const data =await response.json()

      setUserData({...userData,name:data.name,email:data.email, phone:data.phone})
      if(response.status===StatusCodes.OK)
      {
        console.log("contact us page")
      }
    } catch (error) {
      console.log("contact page error", error)
    }
    
  }

  useEffect(()=>{
    callContactPage();
  },[])

  // send data to backend

  const handleSubmit =async(e)=>{
    e.preventDefault()
    const {name, email, phone, message} = userData
    
    const response = await fetch("/contacts",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    })

    const data = await response.json()

    // if(!data){
    //   console.log("message not sent")
    // }
    // else{
    //   alert("Message Send")
    //   setUserData({...userData, message:""})
    // }

    if(response.status===StatusCodes.CREATED){

      alert("Message Send")
      setUserData({...userData, message:""})
    }
    else if(response.status===StatusCodes.UNAUTHORIZED){
      alert("plz login ")
      history("/login")
    }
    else{

      alert("plz fill message fields")
      console.log("message not sent")
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-4 col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body d-flex align-items-centr">
                <div className='d-flex align-items-center m-2'>
                  <FcIpad />
                </div>
                <div>
                  <h5 className="card-title">phone</h5>
                  <p className="card-text">{userData.phone}</p>

                </div>

              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body d-flex align-items-center">
                <div className='d-flex align-items-center m-2'>
                  <AiOutlineMail />
                </div>
                <div>
                  <h5 className="card-title">Email</h5>
                  <p className="card-text">{userData.email}</p>

                </div>

              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body d-flex align-items-centr">
                <div className='d-flex align-items-center m-2'>
                  <IoMdPin />
                </div>
                <div>
                  <h5 className="card-title">Address</h5>
                  <p className="card-text">Pune ,MH ,India</p>

                </div>

              </div>
            </div>
          </div>

        </div>


        <div className="container">
          <div className='row'>
            <div className='col-lg-10 offset-lg-1'>
              <div className=" mt-5 alert alert-secondary" role="alert">
                Get in Touch
              </div>

              <form className='mt-2 mt-sm-1 mt-md-2' onSubmit={handleSubmit} method='POST'>
                <div className="row mt-2">

                  <div className="col-lg-4 col-md-6 col-sm-10 mt-sm-3 my-3">
                    <input type="text" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" name='name' value={userData.name} onChange={handleChange} placeholder='Your Name' required="true" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-10 mt-sm-3 my-3">
                    <input type="email" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" name='email' value={userData.email} onChange={handleChange} placeholder='Your Email' required="true" />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-10 mt-sm-3 mt-3">
                    <input type="number" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" name='phone' value={userData.phone} onChange={handleChange} placeholder='Your Number' required="true" />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='message' value={userData.message} onChange={handleChange}></textarea>
                </div>

                <div className='mt-3 mb-5'>
                  {/* <input type="button" value="Submit" className='btn btn-primary' /> */}
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>

          </div>
        </div>




      


      </div>

    </>
  );
}

export default Contact;
