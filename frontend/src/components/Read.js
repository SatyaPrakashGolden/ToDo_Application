import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Read.css'; 

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  async function GetData() {
    try {
      const response = await fetch('http://localhost:5000/');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  }

  const HandleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/${_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setError('Data Delete Successfully');
      setTimeout(() => {
        setError('');
        GetData();
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSortByName = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setData(sortedData);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className='container my-2'>
      <h2 className='text-center'>ALL DATA</h2>
      {error && <p className='text-danger'>{error}</p>}
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
              <strong>Name</strong>
              <button className='btn btn-link' onClick={handleSortByName}>
                {sortOrder === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th><strong>Age</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Edit</strong></th>
            <th><strong>Delete</strong></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((ele) => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.age}</td>
                <td>{ele.email}</td>
                <td>
                  <Link to={`${ele._id}`} className='btn btn-success'>
                    Edit
                  </Link>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => HandleDelete(ele._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Read;
