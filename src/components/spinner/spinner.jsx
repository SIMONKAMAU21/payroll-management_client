import React, { useEffect, useState } from 'react';
import '../spinner/spinner.scss';

const Spinner = () => {
   const [userDetails, setUserDetails] = useState(null);

   useEffect(() => {
      const userDetailsFromLocalStorage = localStorage.getItem('userDetails');
      if (userDetailsFromLocalStorage) {
         setUserDetails(JSON.parse(userDetailsFromLocalStorage));
      }
   }, []);

   return (
      <div>
         <div className="spinner">
            {userDetails && userDetails.Firstname}
            <div className="spinner-sector spinner-sector-red"></div>
            <div className="spinner-sector spinner-sector-blue"></div>
            <div className="spinner-sector spinner-sector-green"></div>
            <div className="spinner-sector spinner-sector-yellow"></div>
         </div>
      </div>
   );
};

export default Spinner;
