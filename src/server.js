const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'customers.json');

app.get('/api/customers', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/customers', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      const customers = JSON.parse(data);
      const newCustomer = { ...req.body, id: Date.now() };
      customers.push(newCustomer);
      fs.writeFile(dataFile, JSON.stringify(customers, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing file');
        } else {
          res.json(newCustomer);
        }
      });
    }
  });
});

app.delete('/api/customers/:id', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading file');
    } else {
      let customers = JSON.parse(data);
      customers = customers.filter(c => c.id !== parseInt(req.params.id));
      fs.writeFile(dataFile, JSON.stringify(customers, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing file');
        } else {
          res.json({ message: 'Customer deleted' });
        }
      });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));