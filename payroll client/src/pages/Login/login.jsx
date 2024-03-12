import React from 'react'
import "../Login/login.scss"

const Login = () => {
  return (
    <div>
      <form>
         <div className="form-holder">

        <div className='inputs'>
        <label htmlFor="" className='labels'>email
               <input type="text" placeholder='Email..' />
            </label>
        </div>

        <div className=' inputs'>
        <label htmlFor="" className='labels'>Password
               <input type="text" placeholder='Enter password..' />
            </label>
        </div>
        <div className="btn">
         <button>login
         </button>
        </div>
         </div>
      </form>
    </div>
  )
}

export default Login