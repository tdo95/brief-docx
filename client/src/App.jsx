import './App.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Auth from './components/Auth';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<ProtectedRoute required='login'><div>Home Page <Outlet></Outlet></div></ProtectedRoute>}>
          <Route index element={<div>Dashbord Page</div>} />
          <Route path='new' element={<div>New Document Page</div>} />
          {/* TODO: This route should be protected and require a template  */}
          <Route path='create' element={<div>Edit Document Page</div>} />
        </Route>
        <Route path='/product'element={<Product/>}/>
        <Route path='/about'element={<div>About Page</div>}/>
        <Route path='/login'element={<Auth login={true}/>}/>
        <Route path='/signup'element={<Auth login={false}/>}/>
        <Route path='*'element={<div>404 Page</div>}/>
      </Routes>
    </div>
  );
}

export default App;
