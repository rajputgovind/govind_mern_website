import React, { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes'
const Home = () => {
  const [name, setName] = useState('')
  const [show, setShow] = useState(false)

  const callHomePage = async () => {
    try {
      const response = await fetch("/contact", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"

        },

      })
      console.log(response)
      const data = await response.json()
      if(response.status === StatusCodes.OK)
      {
        setName(data.name)
        setShow(true)

      }
      

    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    callHomePage();
  }, [])
  return (
    <>
      <div className="container home mt-5 d-flex align-items-center justify-content-center">
        <div >
          <p className='text center home_welcome' >WELCOME</p>
          <h1 className='text center ' ><span className='name'>{name}</span></h1>
          {
            show?
           <h2><span className='mern'>Happy</span>  , to see you back</h2>
          :<h1> We Are The <span className='mern'>MERN</span>  Developer</h1>
          }

        </div>

      </div>
      <br /><br /><br /><br /><br /><br /><br />

    </>
  );
}

export default Home;
