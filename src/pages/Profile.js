import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import { useSelector } from "react-redux";
import image from "../Images/whatsapp.png"
export default function Profile() {
  const [myproducts, setmyproducts] = useState([{}]);
  const [myrequests, setmyrequests] = useState([{}]);
  const [requests, setrequests] = useState([{}]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (user && user._id) {
      getmyproducts();
      getmyrequests();
      getrequests();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  const getmyproducts = async () => {
    try {
      const response = await fetch("/myproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId: user._id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setmyproducts(data);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteproduct = async (id) => {
    try {
      const response = await fetch(
        `/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        getmyproducts();
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const getmyrequests = async () => {
    try {
      const response = await fetch("/myrequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userEmail: user.email }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setmyrequests(data);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getrequests = async () => {
    try {
      const response = await fetch("/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ requestUserEmail: user.email }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setrequests(data);
      } else {
        console.error("Error fetching products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  function getStatusColorClass(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-400 text-black"; // Change to your desired color
      case "Accepted":
        return "bg-green-400 text-white"; // Change to your desired color
      case "Declined":
        return "bg-red-400 text-white"; // Change to your desired color
      default:
        return "bg-blue-600 text-white"; // Default color if status doesn't match
    }
  }
  
  const handleConnect = async (mobile) => {
    try {
      const whatsappLink = `https://wa.me/${mobile}`;
      window.open(whatsappLink, '_blank');
    } catch (error) {
      console.error('Error updating the request:', error);
    }
  };

  const handleAccept= async(request)=>{
    try {
      console.warn(request);
      const response = await fetch("/changeStatusAccepted", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
          alert(data)
          getrequests();
      } else {
        const data = await response.json();
        console.log(data);
          alert(data);
          getrequests();
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleDecline= async(request)=>{
    try {
      console.warn(request);
      const response = await fetch("/changeStatusDecline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
          alert(data);
          getrequests();
      } 
      else {
        const data = await response.json();
        console.log(data);
          alert(data);
          getrequests();
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <>
      <div className="pt-36 mx-5 md:mx-40">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-950">
          My Requests
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full tableBorder rounded-lg table-fixed border border-collapse">
            <thead>
              <tr>
                <th className="tableBorder w-1/6 px-4 py-2 border">S.No.</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Requested To</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Email Address</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Semester</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Subject</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {myrequests.map((request, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="tableBorder px-4 py-2 border text-center">{index + 1}</td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.requestUsername}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.requestUserEmail}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.semester}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.subject}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    <button className={`btnValue  ${getStatusColorClass(request.status)}`}>
                      {request.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-36 mx-5 md:mx-40">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-950">
          Requests For Me
        </h1>
        <div className="overflow-x-auto">
          <table className="tableBorder min-w-full table-fixed border border-collapse">
            <thead>
              <tr>
                <th className="tableBorder w-1/6 px-4 py-2 border">S.No.</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Requested By</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Email Address</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Semester</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Subject</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Current Status</th>
                <th className="tableBorder w-1/6 px-4 py-2 border">Activity</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="tableBorder px-4 py-2 border text-center">{index + 1}</td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.userName}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.userEmail}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.semester}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    {request.subject}
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                  <div className="flex justify-center items-center">
                      <button className={`btnValue ${getStatusColorClass(request.status)}`}>
                        {request.status}
                      </button>
                    </div>
                  </td>
                  <td className="tableBorder px-4 py-2 border text-center">
                    <div className="flex justify-center items-center">
                      <button className="btnValue"
                      onClick={() => handleAccept(request)}>
                        Accept
                      </button>
                      <button className="btnValue" onClick={() => handleDecline(request)}>
                        Decline
                      </button>
                      {/* <button className="mx-2 px-2 py-2 my-2 bg-blue-600 text-white rounded-md"  onClick={()=>handleConnect(request.requestUserNumber)}>
                        Connect
                      </button> */}
                      <img src={image} alt="logoimg" className="h-10 rounded-xl mx-3 cursor-pointer"  onClick={()=>handleConnect(request.userNumber)}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-28 items-center m-auto lg:w-96 ">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-blue-950">My Notes</h1>
      </div>
      <div className="grid grid-cols-1 mx-6 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-4 lg:px-16">
        {myproducts.length > 0 ? (
          myproducts.map((item, index) => (
            <div key={index} className="col-span-1 my-3">
              <div className="rounded-lg backgrounding heading text-center shadow-md dark:bg-neutral-700">
                <div className="text-3xl px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                  Semester - {item.semester}
                </div>
                <div className="p-6">
                  <h5 className="mb-2 text-3xl font-medium leading-tight text-gray-500">
                    {item.subject}
                  </h5>
                  <p className="mb-4 text-base text-black dark:text-neutral-200">
                    Status - {item.status}
                  </p>
                  <p className="mb-4 text-base text-black dark:text-neutral-200">
                    {item.description}
                  </p>
                  <TERipple>
                    <button
                      type="button"
                      className="btnValue"
                      onClick={() => {
                        deleteproduct(item._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btnValue"
                    >
                      <Link to={"/update/" + item._id}>Update</Link>
                    </button>
                  </TERipple>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="col-span-1 text-center text-3xl font-extrabold">
            No Result Found!..
          </h1>
        )}
      </div>
    </>
  );
}
