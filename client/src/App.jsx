import React from 'react';
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import About from './pages/About';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateDocument from './pages/CreateDocument';
import EditDocument from './pages/EditDocument';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ProtectedRoute required={'login'}><Home /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='new' element={<CreateDocument />} />
          {/* TODO: This route should be protected and require a template  */}
          <Route path='create' element={<ProtectedRoute required={'template'}><EditDocument /></ProtectedRoute>} />
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
