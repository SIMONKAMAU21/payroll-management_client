import React from 'react'
import { Userdata } from '../../dammydata/data'
import { useState } from 'react'
import '../Dashbord/Dashbord.scss'
import UpperDashbord from '../../components/DashbordC omponent/upperDashbord'
import LowerDashbord from '../../components/DashbordC omponent/lowerDashbord'


const Dashbord = () => {
  const [userdata, setUserdata] = useState({
    labels: Userdata.map(data => data.mont),
    datasets: [{
      label: 'Attendance',
      data: Userdata.map(data => data.sales)
    }]
  });
  return (
    <div className='dashbord'>
<UpperDashbord/>
<div className="dashbord-text">
  <div><h3>Attendance graph</h3></div>
</div>
<div className="lower"><LowerDashbord chartData={userdata} />
</div>    </div>

  )
}

export default Dashbord