import logo from './assets/logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<ProtectedRoute required='login'><div>Home Page <Outlet></Outlet></div></ProtectedRoute>}>
          <Route index element={<div>Dashbord Page</div>} />
          <Route path='new' element={<div>New Document Page</div>} />
          {/* TODO: This route should be protected and require a template  */}
          <Route path='create' element={<div>Edit Document Page</div>} />
        </Route>
        <Route path='/product'element={<div>Product Page</div>}/>
        <Route path='/about'element={<div>About Page</div>}/>
        <Route path='/login'element={<div>Login Page</div>}/>
        <Route path='/signup'element={<div>Signup Page</div>}/>
        <Route path='*'element={<div>404 Page</div>}/>
      </Routes>
    </div>
  );
}

export default App;
