import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import About from './components/About';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NewDocument from './components/NewDocument';
import CreateDocument from './components/CreateDocument';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ProtectedRoute required={'login'}><Home /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='new' element={<NewDocument />} />
          {/* TODO: This route should be protected and require a template  */}
          <Route path='create' element={<ProtectedRoute required={'template'}><CreateDocument /></ProtectedRoute>} />
        </Route>
        <Route path='/product'element={<Product/>}/>
        <Route path='/about'element={<About />}/>
        <Route path='/login'element={<Auth login={true}/>}/>
        <Route path='/signup'element={<Auth login={false}/>}/>
        <Route path='*'element={<div>404 Page</div>}/>
      </Routes>
    </div>
  );
}

export default App;
