import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Get single user data
  const singleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
      } else {
        const result = await response.json();
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  // Send updated data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateUser = { name, email, age };

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
      } else {
        setError("");
        navigate("/read");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setError("Error updating data");
    }
  };

  useEffect(() => {
    singleUser();
  }, []);

  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Edit the data</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      <form className="form" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;
