import React from 'react'
import {Form, Input ,message } from 'antd';
import '../styles/RegisterStyles.css'
import  {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import axios from 'axios'
const Register = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onfinishHandler=async(values)=>
    {
      try {
        dispatch(showLoading())
         const res=await axios.post('api/v1/user/register',values)
         dispatch(hideLoading())
         if(res.data.success)
          {
            message.success('Register Successfully')
            navigate('/login')
          }
          else{
            message.error(res.data.message)
          }
      } catch (error) {
         dispatch(hideLoading)
         console.log(error)
         message.error(`Something went wrong`)
      }
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