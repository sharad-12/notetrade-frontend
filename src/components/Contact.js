import React,{useState} from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validation = () => {
        const newErrors = {};
        const emailPattern = /^[0-9]+@iiitu\.ac\.in$/;
    
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }
    
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
          newErrors.email = 'Please enter your Institute Email ID';
        }
    
        if (!formData.message) {
          newErrors.message = 'Password is required';
        } 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const sendmessage = async (e) => {
        e.preventDefault();
      
        if (validation()) {
          try {
            const response = await fetch('/sendmessage', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // This sends cookies with the request
              body: JSON.stringify(formData),
            });
      
            if (response.status === 200) {
              const data = await response.json();
      
              if (data === 'true') {
                alert("Your Message has been successfully send!...")
                setFormData({
                  name: '',
                  email: '',
                  message: '',
                });
              }
            } else {
              console.error('Error:', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };
  return (
    <section className=" py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="md:col-span-1 lg:ml-10">
          <h2 className="text-3xl contactus  heading font-extrabold text-white sm:text-4xl">
            Contact Us
          </h2>
          <h3 className="text-lg contactus1 text-gray-500 font-medium  mt-4">
            Get in Touch
          </h3>
          <p className="mt-1 contactus2 text-gray-500 text-justify w-9/12 ">
            Got questions or feedback? We'd love to hear from you! Reach out
            to our friendly team at below contact details, and we'll be
            happy to assist you.
          </p>
          <div className="mt-6 pl-6 flex items-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-500 text-2xl mr-2"
            />
            <h4 className="text-md  text-gray-500 font-medium  inline-block">
              Email :
            </h4>
            <p className=" text-gray-500  ml-2">NoteTrade@gmail.com</p>
          </div>
          <div className="mt-6 pl-6 flex items-center">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-gray-500 text-2xl mr-2"
            />
            <h4 className="text-md text-gray-500 font-medium  inline-block">
              Phone :
            </h4>
            <p className=" text-gray-500 ml-2">+91-98xx58xx26</p>
          </div>
        </div>
        <div className="md:col-span-1 lg:pr-10">
          <h3 className="text-3xl heading text-gray-500  font-extrabold ">
            Send Us a Message
          </h3>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Enter your Name"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && (
              <span className="text-white">{errors.name}</span>
            )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
              <span className="text-white">{errors.email}</span>
            )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-500"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Your message here"
                onChange={handleChange}
                value={formData.message}
              />
              {errors.message && (
              <span className="text-white">{errors.message}</span>
            )}
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="btnValue px-4 py-2 rounded-2xl text-white font-bold "
                onClick={(e)=>{sendmessage(e)}}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}
