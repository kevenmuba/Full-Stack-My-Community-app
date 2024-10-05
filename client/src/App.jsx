import { useState } from 'react'
import './App.css'
import { Button } from 'antd';
import 'antd/dist/reset.css'; // Use reset.css for better compatibility
import AppHeader from './components/Header';
import Intro from './components/Intro';

import ImageCarouselWithDescription from './components/ImageCaresoul';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import EmployeeForm from './pages/EmployeeSignup';
import CustomerForm from './pages/CustomerSignup';
import LoginForm from './pages/LoginForm';
import TestContext from './components/testContext';



function App() {
 

  return (
    <>
    <AppHeader/>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/sign-up" element={<EmployeeForm/>} />
    <Route path="/sign-up-customer" element={<CustomerForm/>} />
    <Route path="/login" element={<LoginForm/>} />
    <Route path="/test" element={<TestContext/>} />


    </Routes>
    
     
    </>
  )
}

export default App
