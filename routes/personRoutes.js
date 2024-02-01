const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


//...POST route to add a person... 
router.post('/', async (req, res) => {
   try {
      const data = req.body // Assuming the request body contains the person data..
      //create a new person document using the mongoose model 
      const newPerson = new Person(data);
      //Save the new person to the databases 
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response)
   }
   catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' })
   }
})

//..GET method to get the person... 
router.get('/', async (req, res) => {
   try {
      const data = await Person.find();
      res.status(200).json(data);
   } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

router.get('/:workType', async (req, res) => {
   try {
      const workType = req.params.workType // Extract the work type from the url parameter 
      if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
         const response = await Person.find({ work: workType });
         console.log('response fectched');
         res.status(200).json(response);
      }
      else {
         res.status(404).json({ error: 'Invalid work type' });
      }
   } catch (error) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

router.put('/:id', async (req, res) => {
   try {
      const personId = req.params.id; //Extract the id from the URL parameter 
      const updatedPersonData = req.body; //Updated data for the person 
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
         new: true, //Return the updated document
         runValidators: true //Run Mongoose validatin
      })

      if (!response) {
         return res.status(404).json({ error: 'Person not found' });
      }
      console.log('Data updated');
      res.status(200).json(response);
   }
   catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

router.delete('/:id', async (req, res) => {
   try {
      const personId = req.params.id; //Extract the person's ID from the URL parameter 
      //Assuming you have a Person Model 
      const response = await Person.findByIdAndDelete(personId);
      if (!response) {
         return res.status(404).json({ error: 'Person not found' });
      }
      console.log('data delete');
      res.status(200).json({ message: 'person Deleted Successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

module.exports = router;