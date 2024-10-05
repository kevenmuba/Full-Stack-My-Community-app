import React, { useState } from 'react';
import { Form, Input, Button, message, Alert } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustomerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setBackendError(null);
    try {
      // Add the role 'customer' to the values
      const customerData = { ...values, role: 'customer' };
      const response = await axios.post('http://localhost:4000/api/users', customerData);
      message.success('Customer account created successfully!');
      form.resetFields();
      const {token} = response.data
      localStorage.setItem('token',token)
    } catch (error) {
      if (error.response && error.response.data) {
        setBackendError(error.response.data.error || 'An error occurred while creating the customer account.');
      } else {
        setBackendError('An error occurred while creating the customer account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Customer Account</h2>
      {backendError && (
        <Alert
          message="Error"
          description={backendError}
          type="error"
          showIcon
          closable
          className="mb-4"
          onClose={() => setBackendError(null)}
        />
      )}
      <Form
        form={form}
        name="customerForm"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input className="w-full px-3 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input className="w-full px-3 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' }
          ]}
        >
          <Input.Password className="w-full px-3 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Create Account
          </Button>
        </Form.Item>
        <div className="text-center mt-4">
          <span className="text-gray-800">
            Already have an account? 
            <Link to="/login" className="text-blue-500 hover:text-blue-600 ml-1">Login here</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;