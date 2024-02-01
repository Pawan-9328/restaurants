const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

//...Post route for Menu...
router.post('/', async (req, res) => {
   try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log('Menu data saved');
      res.status(200).json(response)
   }
   catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' })
   }
})

//..Get method to get the Menu Items.. 
router.get('/', async (req, res) => {
   try {
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});


router.get('/:taste', async (req, res) => {
   try {
         
      const tasteType = req.params.taste;
      if(tasteType == 'sweet' || tasteType=='sour'||tasteType=='spicy'){
           const response  = await MenuItem.find({taste: tasteType});
           console.log('response fectched');
           res.status(200).json(response);
      }
      else {
         res.status(404).json({ error: 'Invalid work type' });
      }

   } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

module.exports = router;