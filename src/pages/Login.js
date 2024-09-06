import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import login from '../Images/login.png'
import { setUser } from '../redux/slices/userSlice';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validation = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validation()) {
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This sends cookies with the request
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          const data = await response.json();
  
          if (data === 'Notfound') {
            alert('Please enter a correct Email');
            return;
          } else if (data === 'Notmatch') {
            alert('Please enter a correct Password');
            return;
          }
          localStorage.setItem('user', data.name);
          localStorage.setItem('userId',data._id);
          dispatch(setUser(data))
          setFormData({
            email: '',
            password: '',
          });
          navigate('/home');
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  return (
    <div className="logining">
      
        <img className="imaging" src={login} alt="" />
      
      <div className="flex loginBox backky signup1 flex-col items-center min-h-screen  sm:pt-0 bg-gray-50">
        <div>
          <h3 className="text-4xl font-bold heading">Login</h3>
        </div>
        <div className="w-full rounded-lg imageview  px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div className="mt-4 ">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
            </div>
            <Link to="/signup" className="text-xs heading hover:underline">
              Forgot Password?
            </Link>
            <div className="flex items-center mt-5">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform btnValue rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={(e)=>handleSubmit(e)}
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-600">
            Don't have an account?{' '}
            <span>
              <Link className="heading hover:underline" to="/signup">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

