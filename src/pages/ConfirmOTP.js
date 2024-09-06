import React, { useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
const ConfirmOTP = () => {
  const [otp, setOTP] = useState('');
  const navigate =useNavigate();
  
  useEffect(()=>{
    let data=localStorage.getItem("user");
    console.log(data);
    if(data==null){
    navigate("/");
    }
  },[navigate])

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOTP(value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // You can add your OTP verification logic here
    console.log('OTP Submitted:', otp);
    // Reset the OTP input
    const res =await (await fetch("/confirmotp",{method:'POST',credentials:'include',body:new URLSearchParams({otp})})).json();
    console.log(res);
    if(res==="true"){
      alert("Your Resquest has been send to the provider.");
      navigate("/home");
    }
    else if(res==="Already requested"){
      alert("Already Requested");
      navigate('/home')
    }
    else{
      alert("Please enter the correct OTP");
      navigate("/ConfirmOTP");
    }
    setOTP('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Confirm OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-medium">
              Enter the OTP sent to your email:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-300"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full text-white py-2 px-4 rounded-md btnValue focus:outline-none focus:ring focus:ring-blue-200"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmOTP;
