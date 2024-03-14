import React from 'react'
import '../Employeemanagement/AddEmployee.scss'

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
                     type="text"
                     placeholder="Position"
                     id='eventLocation'
                     name='eventLocation'
                  />
                  <input
                     type="file"
                     placeholder="image..."
                     id='eventurl'
                     name='eventurl'
                  />
                  <input
                     type="date"
                     placeholder=" date of birth"
                     id='eventDate'
                     name='eventDate'
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