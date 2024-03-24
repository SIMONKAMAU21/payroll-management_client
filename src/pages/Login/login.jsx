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
          <div className="animation">

            <RxDashboard size='34px' color='rgb(0, 211, 248)' />
          </div>
          
          <div className="form-lholder">
            <div className="inputs-holder">
              <div className='input-holder'>
                <input
                  placeholder="Email..."
                  {...register('Email')}
                />
                <div className="react">
                  <MdOutlineMarkunread size="34px" color="rgba(9, 5, 132, 0.743)" />
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
                  <MdLockPerson size="34px" color="rgba(9, 5, 132, 0.743)" />
                </div>
              </div>
              <p>{errors.Password?.message}</p>
            </div>
            <div className='btn'>
              <button type="submit">
                Login
              </button>
            </div>
            <div>
              <h4>Good to see you again</h4>
            </div>

          </div>
          <div className="animation1">
            <RxDashboard size='34px' color='white' />
            welcome Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, voluptatibus atque dolorum aliquid assumenda laborum velit nulla culpa corrupti sunt veniam quae suscipit? Explicabo reiciendis, quos amet porro nesciunt autem!
          </div>
        </div>
       
      </form>

    </div>
  );
};

export default Login;
