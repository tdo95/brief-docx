import logo from './assets/logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, } from 'react-router-dom'
import { useAuth } from './components/hooks/auth'

function App() {
  const auth = useAuth()
  console.log(auth)
  return (
    <div className="App">
      <Routes>
        {/* TODO: This route will be protected by login */}
        <Route exact path='/' element={''}>
          <Route index element={''} />
          <Route path='new' element={''} />
          {/* TODO: Require Template Auth Method  */}
          <Route path='create' element={''} />
        </Route>
        <Route path='/product'element={''}/>
        <Route path='/about'element={''}/>
        <Route path='/signin'element={''}/>
        <Route path='/signup'element={''}/>
        <Route path='*'element={''}/>
      </Routes>
    </div>
  );
}

export default App;
