const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'customers.json');

// Read initial data from customers.json
let customers = [];
try {
  const data = fs.readFileSync(dataFile, 'utf8');
  customers = JSON.parse(data);
  console.log('Initial customer data loaded');
} catch (err) {
  console.error('Error reading initial customer data:', err);
}

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
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
});

app.delete('/api/customers/:id', (req, res) => {
  customers = customers.filter(c => c.id !== parseInt(req.params.id));
  fs.writeFile(dataFile, JSON.stringify(customers, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing file');
    } else {
      res.json({ message: 'Customer deleted' });
    }
  });
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current customers: ${JSON.stringify(customers)}`);
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  }
});