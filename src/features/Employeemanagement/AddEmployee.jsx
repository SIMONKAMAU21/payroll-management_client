import React from 'react'
import './AddEmployee.scss'

const AddEmployee = ({closeEmployee}) => {
  return (
    <div>
  <div className="form-container">
            <form className='eventWrap'>
               <div className="btn" >
                  <button onClick={closeEmployee}>X</button>
               </div>
               <div className="textarea">
                  <input
                     placeholder="First name.."
                     id='eventName'
                     name='eventName'
                  />
                  <input
                     type="text"
                     autoComplete='on'
                     placeholder="LastName"
                     id='eventDescription'
                     name='eventDescription'
                  />
                  <input
                     type="Date"
                     autoComplete='on'
                     placeholder="Address"
                     id='eventDescription'
                     name='eventDescription'
                  />
                  <input
                     type="text"
                     placeholder="Birth"
                     id='eventLocation'
                     name='eventLocation'
                  />
                  <input
                     type="file"
                     placeholder="image..."
                     id='photoURL'
                     name='photoURL'
                  />
                  <input
                     type="text"
                     placeholder=" contact..."
                     id='contactInfo'
                     name='contactInfo'
                  />
                  <input
                     type="text"
                     placeholder=" Admin"
                     id='contactInfo'
                     name='contactInfo'
                  />
                  <input
                     type="text"
                     placeholder=" Email..."
                     id='Email'
                     name='Email'
                  />
                  <input
                     type="text"
                     placeholder=" Password..."
                     id='password'
                     name='password'
                  />
                  <div className="footer">
                     <div className="btn">
                        <button type="submit">Add Employee</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>


    </div>
  )
}

export default AddEmployee