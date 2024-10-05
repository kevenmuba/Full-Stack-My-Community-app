import React, { useState } from 'react';
import { Form, Input, Button, message, Alert } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setBackendError(null);
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email: values.email, // Use email instead of username
        password: values.password,
      });
      
      message.success('Login successful!');
      
      // Assuming the backend returns a token
      const { token } = response.data;
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setBackendError(error.response.data.error || 'An error occurred while logging in.');
      } else {
        setBackendError('An error occurred while logging in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
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
        name="loginForm"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="email" // Change to email
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input className="w-full px-3 py-2 border rounded-md" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
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
            Login
          </Button>
        </Form.Item>
        <div className="text-center mt-4">
          <span className="text-gray-800">
            Don't have an account? 
            <Link to="/sign-up-customer" className="text-blue-500 hover:text-blue-600 ml-1">Register here</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;