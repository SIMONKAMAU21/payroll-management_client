import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { MdLockPerson, MdOutlineMarkunread } from "react-icons/md";
import { ErrorToast, LoadingToast, SuccessToast } from '../../components/toaster/Toaster';


import './login.scss';
import { useLoginUserMutation } from './loginApi';
import { RxDashboard } from 'react-icons/rx';
import Spinner from '../../components/spinner/spinner';

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    Email: yup.string().email('Invalid email').required('Email is required'),
    Password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();

      const { token, user } = response
      if (user.Admin) {
        navigate('admin/');
      }
      else {
        navigate('/employee');
      }
      localStorage.setItem('token', token)
      localStorage.setItem('userDetails', JSON.stringify(user))
      SuccessToast('login successfull')
    } catch (error) {
      ErrorToast('In valind cridentials')
    }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-wrap">
          <div className="container-form">
            <div className="form-lholder">
              <div className="inputs-holder">
                <div className='input-holder'>
                  <input
                    placeholder="Email..."
                    {...register('Email')}
                  />
                  <div className="react">
                    <MdOutlineMarkunread size="34px" color="black" />
                  </div>
                </div>
                <p>{errors.Email?.message}</p>
                <div className='input-holder'>
                  <input
                    type="password"
                    placeholder="Password.."
                    {...register('Password')}
                  />
                  <div className="react">
                    <MdLockPerson size="34px" color="black" />
                  </div>
                </div>
                <p>{errors.Password?.message}</p>
              </div>
              <div className='btn'>
                <button type="submit">
                  Login
                </button>
              </div>
              <div className="spinner">
              <Spinner/>
              </div>
              <div>
              </div>

            </div>

            <div className="text-login">
              <div className="welcome">
                <h1>WELCOME</h1>
              </div>
               <div className="p-text">
                <h2> <span>TO PAYROLL AND MANAGEMENT SYSTEM</span></h2>
                <p>PLEASE ENTER YOUR CREDENTIALS TO ACCESS YOUR ACCOUNT</p>
              </div>
              <div className="extra">
                <p>Made easy for you</p>
              </div>
           
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};

export default Login;
