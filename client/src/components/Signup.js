import React ,{useState} from 'react';
import { ImUser } from "react-icons/im";
import { AiOutlineProfile } from "react-icons/ai";
import { MdEmail, MdPermPhoneMsg, MdPassword } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes"
const Signup = () => {
  const history = useNavigate()
  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    woek:"",
    password:"",
    cpassword:""
  });
  // const [data, setData] = useState([]);
  const handleChange =(e)=>{
    const name = e.target.name
    const value = e.target.value
      setUser({...user,[name]:value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    // setData([...data,user])
    const {name,email,phone,work, password,cpassword} = user
    const response =await fetch("/registers",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({
        name,email,phone,work, password,cpassword
      })
    })
    console.log(response)
    const data =await response.json()
    console.log(data)
    // if(data.status===422||data.status=== 500||data.status === 400 || !data){
    //   window.alert("invalid Registration")
    //   console.log("invalid")
    // }
    // else{
    //   window.alert("Registration Successful")
    //   console.log("Registration successful")
      
    //   history("/login")
    // }

    if(response.status===StatusCodes.CREATED){
      window.alert("Registration Successful")
      console.log("Registration successful")
      
      history("/login")
    }else{
      window.alert("invalid Registration")
      console.log("invalid")
    }
  }


  return (
    <>
      <div className='container mt-5 mb-5'>

        <div className='row'>
          <div className='col-lg-6 col-md-4 col-sm-10'>
            <div className="alert alert-light " role="alert">
              <h1 className='mt-3 text-center'>SignUp</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <ImUser /> <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="formGroupExampleInput" value={user.name} placeholder="Your Name" onChange={handleChange}/>
              </div>

              <div className="form-group mb-3">
                <MdEmail /> <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" name='email' id="email" value={user.email} placeholder="Your Email" onChange={handleChange}/>
              </div>

              <div className="form-group mb-3">
                <MdPermPhoneMsg /> <label htmlFor="phone" className="form-label">Phone</label>
                <input type="Number" className="form-control" name='phone' id="phone" value={user.phone} placeholder="Your Phone" onChange={handleChange}/>
              </div>

              <div className="form-group mb-3">
                <AiOutlineProfile /> <label htmlFor="work" className="form-label">Profession</label>
                <input type="text" className="form-control" name='work' id="work" value={user.work} placeholder="Your Preofession" onChange={handleChange}/>
              </div>

              <div className="form-group mb-3">
                <MdPassword /> <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" value={user.password} placeholder="Your Password" onChange={handleChange}/>
              </div>

              <div className="form-group mb-3">
                <MdPassword /> <label htmlFor="cpassword" className="form-label">Confirm password</label>
                <input type="password" className="form-control" name='cpassword' id="cpassword" value={user.cpassword} placeholder="Confirm your password" onChange={handleChange}/>
              </div>
              <div className='mt-4 form-group'>
                <input type="submit" name="signup" id="signup" className='btn btn-primary' value="Register" />
              </div>

            </form>


            <div className='mt-4'>
              <NavLink to='/login' className="d-block" >I am already register</NavLink>

            </div>
          </div>

          <div className=' mt-5 col-lg-6 col-md-4 col-sm-10  d-flex align-items-center justify-content-center '>

            <figure className='signupImg'>
              <img src="/Images/signup.jpg" alt="Image" />
            </figure>
          </div>


        </div>

      </div>


    </>
  );
}

export default Signup;
