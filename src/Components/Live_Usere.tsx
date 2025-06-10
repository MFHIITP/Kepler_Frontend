import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../main';

const FetchAndDisplayData = (props) => {
  const [data, setData] = useState([]);
  const {adminemails} = useContext(MyContext)
  const serv_addr = import.meta.env.VITE_SERV_ADDR;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serv_addr}/liveusers`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        setData(result); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [serv_addr]);

  if(!adminemails.includes(props.details.email)){
    return (
      <>
        <div className="text-white font-4xl">You are not an admin. Please leave immediately</div>
      </>
    )
  }


  return (
    <div className="container mx-auto p-4 text-white h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Live User Information ({data.length})</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">In Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User Device</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-600">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{item.email_id}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{item.createdAt}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{item.details}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{item.locations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FetchAndDisplayData;
