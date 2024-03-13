import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { MdLockPerson, MdOutlineMarkunread } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { PuffLoader } from 'react-spinners';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      // Call authentication function here
      // Example:
      // const response = await authenticateUser(data.email, data.password);
      // if (response.success) {
      //   navigate('/dashboard');
      // } else {
      //   // Handle authentication error
      // }
      navigate('*')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-wrap">
          <div className="form-lholder">
            <div className="inputs-holder">
              <div className='input-holder'>
                <input
                  placeholder="Email..."
                  {...register('email')}
                />
                <div className="react">
                  <MdOutlineMarkunread size="34px" color="rgba(9, 5, 132, 0.743)" />
                </div>
              </div>
              <p>{errors.email?.message}</p>
              <div className='input-holder'>
                <input
                  type="password"
                  placeholder="Password.."
                  {...register('password')}
                />
                <div className="react">
                  <MdLockPerson size="34px" color="rgba(9, 5, 132, 0.743)" />
                </div>
              </div>
              <p>{errors.password?.message}</p>
            </div>
            <div className='btn'>
              <button type="submit">
                Login
              </button>
            </div>
            <div>
              <h4>Good to see you again</h4>
            </div>
            <div className="double">
              <div>
                <FaCheckDouble size="80px" color="rgba(9, 5, 132, 0.743)" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
