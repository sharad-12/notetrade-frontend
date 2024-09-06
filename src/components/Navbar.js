import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../Images/images.png'
export default function Navbar() {

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();
    navigate('/login');
  }

  let [open, setOpen] = useState(false);
  return (
    <div className='shadow-md z-10 w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between navbar py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-white'>
          <img src={images} alt="logoimg" className="h-10 rounded-xl mx-3" />
          NoteTrade
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden lg:mb-20'>
          <ion-icon name={open ? 'close' : 'menu'} class={open ? 'text-white' : 'text-white'}></ion-icon>
        </div>
        {
          auth ?
            <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static navbar text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "><Link to="/home">Available</Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer  "><Link to="/add">Add </Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer  "><Link to="/profile">Profile</Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "><Link onClick={logout} to="/">Logout({auth})</Link></li>
            </ul>
            :
            <ul className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static navbar text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-6 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "> <Link to="/">Home</Link> </li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "><Link to="/service">Services</Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "><Link to="/about">About</Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer  "><Link to="/faq">FAQ</Link></li>
              <li className="md:ml-8 py-1 text-xl md:my-0 cursor-pointer "><Link to="/contact">Contact</Link></li>
            </ul>
        }
      </div>
    </div>
  )
}
