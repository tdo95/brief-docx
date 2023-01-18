import React from 'react'
import { useState, useEffect } from 'react'
import './test.css'

const Test = () => {
    const [form, setForm] = useState({
      email:'',
      password: '',
    })
    const [userRegistered, setUserRegistered] = useState(false)
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch('/home/api/customers')
        .then(res => res.json())
        .then(data => {setCustomers(data.customers); console.log(data)})
        .catch(err => console.log(err))
    }, [])
    useEffect(() => {
      console.log('registering user');
      register();
    }, [userRegistered])
    function saveData(event) {
      const {name, value} = event.target;
      setForm((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
    function register() {
      if (!form.email || !form.password) return console.log('No form entries yet suh')
      fetch('/home/signup', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: form.email, password: form.password})
      })
        .then(res => console.log(res))
    }
  return (
    <div>
      <div>
        <input name="email" value={form.email} type="email" placeholder='email' onChange={saveData}/>
        <input name="password" value={form.password} type="password" placeholder='password' onChange={saveData}/>
        <button onClick={() => setUserRegistered(prev => !prev)}>Submit</button>
      </div>
        <h2>Testing Bois</h2>
        <ul>
        {customers.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    </div>
  )
}

export default Test