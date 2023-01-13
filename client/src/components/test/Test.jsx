import React from 'react'
import { useState, useEffect } from 'react'
import './test.css'

const Test = () => {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch('/home/api/customers')
        .then(res => res.json())
        .then(data => {setCustomers(data.customers); console.log(data)})
    }, [])
  return (
    <div>
        <h2>Testing Bois</h2>
        <ul>
        {customers.map((item, i) => 
            <li key={i}>{item}</li>
        )}
        </ul>
    </div>
  )
}

export default Test