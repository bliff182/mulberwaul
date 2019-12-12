const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/api/burgers', (req, res) => {
   burger.selectAll(data => {
      res.json({ burgers: data });
   });
});

router.post('/api/burgers', (req, res) => {
   burger.insertOne([
      'burger_name', 'devoured'
   ], [
      req.body.burger_name, req.body.devoured
   ], result => {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
   });
});

router.put('/api/burgers/:id', (req, res) => {
   let condition = `id = ${req.params.id}`;

   console.log('condition', condition);

   burger.updateOne({
      // burger_name: req.body.burger_name,
      devoured: req.body.devoured
   }, condition, result => {
      if (result.changedRows == 0) {
         // If no rows were changed, then the ID must not exist, so 404
         return res.status(404).end();
      } else {
         res.json({ id: req.params.id });
      }
   });
});

router.delete('/api/burgers/:id', (req, res) => {
   let condition = `id = ${req.params.id}`;

   burger.deleteOne(condition, result => {
      if (result.affectedRows == 0) {
         return res.status(404).end();
      } else {
         res.status(200).end();
      }
   });
});

module.exports = router;