// Define a route to handle GET requests on the root path
const express = require('express');
const mongoose = require('mongoose');
const router=express.Router();  
const User = require('../models/userModel.js');
// Define a route to handle POST requests for creating user documents
router.post("/", async (req, res) => {
  try {
    // Import the User model from the userModel.js file
   
    
    // Destructure data sent from the frontend request body
    const { name, email, age } = req.body;

    // Create a new User document in the database
    const newUser = await User.create({
      name: name,
      email: email,
      age: age
    });

    // Send a successful response with the created User data
    res.status(201).json(newUser);
  } catch (error) {
    // Send an error response with the error message
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const data = await User.find();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      return; // Exit the function to prevent further execution
    }
  });

  router.get('/:id', async (req, res) => {
    const {id}=req.params;
    try {
      const singledata = await User.findById({_id:id});
      res.json(singledata);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      return; // Exit the function to prevent further execution
    }
  });

  router.delete('/:id', async (req, res) => {
    const {id}=req.params;
    try {
      const singledata = await User.findByIdAndDelete({_id:id});
      res.json(singledata);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
      return; // Exit the function to prevent further execution
    }
  });

 router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and update the fields from req.body
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

 
  module.exports=router;