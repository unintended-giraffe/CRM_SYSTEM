import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `http://localhost:${process.env.PORT || 5001}/api`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/customers`, newCustomer);
      setCustomers([...customers, response.data]);
      setNewCustomer({ name: '', email: '', phone: '' });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`${API_URL}/customers/${id}`);
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customers">
      <h1>Customer Management</h1>
      <div className="content-wrapper">
        <section className="customer-list">
          <div className="section-header">
            <h2>Customer List</h2>
            <button className="add-btn" onClick={() => setIsAdding(true)}>Add Customer</button>
          </div>
          {customers.length === 0 ? (
            <p className="no-data">No customers found.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <button className="action-btn edit-btn">Edit</button>
                        <button className="action-btn delete-btn" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        {isAdding && (
          <section className="add-customer">
            <h2>Add New Customer</h2>
            <form onSubmit={addCustomer}>
              {['name', 'email', 'phone'].map(field => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    id={field}
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={newCustomer[field]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Customer</button>
                <button type="button" className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default Customers;