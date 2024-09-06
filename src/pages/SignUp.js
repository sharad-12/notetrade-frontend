import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser} from '../redux/slices/userSlice';
import Register from '../Images/registration.png'
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile:'',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const validation = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const mobilePattern=/^[0-9]{10}$/;

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter your correct Email ID';
    }
  
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!mobilePattern.test(formData.mobile)) {
      newErrors.mobile = 'Please enter your correct Mobile Number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        'Password should have at least one lowercase letter, one uppercase letter, and one special character';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const collectData = async (e) => {
    e.preventDefault();
  
    if (validation()) {
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This sends cookies with the request
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          const data = await response.json();
  
          if (data === 'exist') {
            alert('Email already exists');
            navigate('/login');
          } else {
            setFormData({
              name: '',
              email: '',
              mobile:'',
              password: '',
            });
            alert("User Successfully Registered");
            localStorage.setItem('user', data.name);
            localStorage.setItem('userId',data._id);
            dispatch(setUser(data));
            navigate('/home');
          }
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className=" backky logining">
      <img className='imaging' src={Register} alt="" />
      <div className="flex loginBox signup2 flex-col items-center min-h-screen backky  sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl heading font-bold text-purple-600">Register</h3>
          </a>
        </div>
        <div className="w-full rounded-lg SignUp px-6 py-4 mt-6 overflow-hidden  shadow-md sm:max-w-lg sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && (
                  <span className="text-gray-500">{errors.name}</span>
                )}
              </div>
            </div>
            <div className="mt-4">
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
                  <span className="text-gray-500">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-500"
              >
                Mobile Number
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="mobile"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={handleChange}
                  value={formData.mobile}
                />
                {errors.mobile && (
                  <span className="text-gray-500">{errors.mobile}</span>
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
                  <span className="text-gray-500">{errors.password}</span>
                )}
              </div>
            </div>
            <div className="flex items-center mt-5">
              <button
                className="w-full px-4 py-2 btnValue tracking-wide  "
                onClick={(e)=>collectData(e)}
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-500">
            Already have an account?{' '}
            <span>
              <Link className="heading hover:underline" to="/login">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
