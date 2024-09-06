import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
  const [formData, setFormData] = useState({
    semester: '',
    subject: '',
    description: '',
  });
  const [semester, setsemester] = useState('');
  const [subject, setsubject] = useState('');
  const [description, setdescription] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    let data=localStorage.getItem("user");
    console.log(data);
    if(data==null){
    navigate("/");
    }
  },[navigate])

  const getproductdetails = async () => {
    try {
      const response = await fetch(
        `/getproducttoupdate/${params.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This sends cookies with the request
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        const { semester, subject, description } = data;
        setFormData({
          semester,
          subject,
          description,
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  useEffect(() => {
    getproductdetails();
  });

  const updatedata = async () => {

  
    try {
      const response = await fetch(
        `/updateproduct/${params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // This sends cookies with the request
          body: JSON.stringify({semester,subject,description}),
        }
      );
  
      if (response.status === 200) {
        const data = await response.json();
        console.warn(data);
        navigate('/profile');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-blue-950">
              Update Notes
            </h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="semester"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Semester
              </label>
              <div className="flex flex-col items-start">
                <input
                  type='text'
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e)=>{setsemester(e.target.value)}}
                  value={semester}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Subject
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e)=>{setsubject(e.target.value)}}
                  value={subject}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Description
              </label>
              <div className="flex flex-col items-start">
                <textarea
                  type="text"
                  className="block w-full mt-1 px-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e)=>{setdescription(e.target.value)}}
                  value={formData.description}
                />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                // type="submit"
                className="inline-flex btnValue items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md active:bg-gray-900 false"
                onClick={updatedata}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
