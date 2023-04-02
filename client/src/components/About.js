import React,{useEffect, useState} from 'react';
import {StatusCodes} from 'http-status-codes'
import { useNavigate } from 'react-router-dom';
const About = () => {
  const history = useNavigate()

   const [userData, setuserData] = useState({});

  const callAboutPage = async() =>{
    try {
        // const tokenStr= localStorage.getItem("token")
        
        const response = await fetch("/about",{
          method:"GET",
    
          headers:{
           Accept:"application/json",
           "Content-Type":"application/json",
          //  Arthorization: `Bearer ${tokenStr}`
          },
          credentials:"include"
        })

        const data = await response.json()

        setuserData(data)
        // console.log(data)
        if(response.status===StatusCodes.OK){
          history('/about')
        }
        else{
          alert("please login first")
          // console.log("error")
          history("/login")
        }
        
      } catch (error) {
       console.log(error)
      }
  }
  useEffect(() => {
    callAboutPage()

  }, []);

  return (
    <>
      <div className="container my-5">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="../Images/govind1.png" alt="userImage" className='d-flex m-auto' />
            </div>
            <div className='col-md-6 '>
              <div className='container'>
                <div>
                <div className='container m-5'>

                  {/* <h4>Govind Jadam</h4> */}
                  <h4>{userData.name}</h4>
                  <h6>{userData.work}</h6>

                  <p className='mt-3 mb-5 '> RANKING: <span>1/10</span></p>
                </div>

                  <div className='about_style container '>

                    <ul className='d-flex mt-5 mb-0 nav nav-tabs' role='tablist'>

                      <li className="nav-item  ">
                        <a className="nav-link active" id='home-tab' href="home" aria-controls='home'  data-toggle='tab' role="tab">About</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" id="profile-tab" href="profile" aria-controls='profile' data-toggle="tab" role="tab">TimeLine</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-md-2 '>
              <input type="text" className='text-center d-block mt-5' value="Edit Profile" />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-4 '>
              <div className='text-center mt-4'>
                <h4 className='mb-3'>WORK LINK</h4>
                <a  href="https://github.com/rajputgovind" target="_blank">GitHub</a><br />
                <a  href="https://www.linkedin.com/in/govind-jadam-11435323a" target="_blank">LinkedIn</a><br />
                <a  href="https://govindrajputwebsite.netlify.app/" target="_blank">Website</a><br />
                
              </div>
            </div>
            <div className='col-md-8 pl-5 container mt-4'>
              <div className='tab-content home-tab'>
                <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby='home-tab'>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3 ">
                        <label htmlFor="User ID">User ID</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">{userData._id}</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">name</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">{userData.name}</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">professinon</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">{userData.work}</label>
                      </div>
                    </div>
                </div>
                </div>
                <div className='tab-content profile-tab'>
                <div className='tab-pane fade show active'  id="profile" role="tabpanel" aria-labelledby='profile-tab'>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3 ">
                        <label htmlFor="User ID">Phone</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">{userData.phone}</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">Hourly rate</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">10$/hr</label>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">Email</label>
                      </div>
                      <div className="col-md-6 col-sm-3">
                        <label htmlFor="User ID">{userData.email}</label>
                      </div>
                    </div>
                </div>

                </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
}

export default About;
