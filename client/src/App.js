import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import Contact from './components/Contact';
import Signup from './components/Signup';
import Login from './components/Login';
import Footer from './components/Footer';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import { createContext, useContext, useReducer } from 'react';
import { initialState,reducer } from './reducer/UserReducers';


export const UserContext = createContext()
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{state, dispatch}}>

        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/about' element={<About></About>}></Route>
          <Route exact path='/contact' element={<Contact></Contact>}></Route>
          <Route exact path='/signup' element={<Signup></Signup>}></Route>
          <Route exact path='/login' element={<Login></Login>}></Route>
          <Route exact path='/logout' element={<Logout></Logout>}></Route>
          <Route path='*' element={<Errorpage></Errorpage>}></Route>
        </Routes>
        <br /><br />
        <Footer></Footer>

      </UserContext.Provider>
    </BrowserRouter>
  );
}


export default App;
