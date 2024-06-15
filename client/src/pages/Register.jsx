import React from 'react'
import {Form, Input } from 'antd';
import '../styles/RegisterStyles.css'
import  {Link} from 'react-router-dom'
const Register = () => {
 
  const onfinishHandler=(values)=>
    {
      console.log(values)
    }
  return (
    <>
     <div className="from-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='register-form card'>
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required></Input>
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
          </Form.Item>
          <Link to="/login" className='m-2 '>Already user login here</Link>
        <button className='btn btn-primary'>Registger</button>
        </Form>
     </div> 
    </>
  )
}

export default Register