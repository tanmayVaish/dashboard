import { useState } from 'react'
import './App.css'
import axios, {Axios} from "axios";

function App() {

  const [plate, setPlate] = useState(null);
  const [type, setType] = useState("truck");
  const [subtype, setSubtype] = useState(null);
  const [from , setFrom] = useState('2010-08-01T00:00:00');
  const [to , setTo] = useState('2021-09-01T00:00:00');
  const [data, setData] = useState(null);

  const fetchData = async (e) => {
    e.preventDefault();
    await axios.post('https://tolltax.xyz/demoapi/dashboard', {
      licence_plate: plate,
      vehicle_type: type,
      vehicle_subtype: subtype,
      datefrom: from,
      dateto: to,
    }).then(function (response) {
      console.log(response.data.data);
      setData(response.data.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
      <div className="App">
        <div className="title">
          <span>Toll Tax</span>
        </div>
        <form className='form' onSubmit={fetchData}>
          <div className='inputs'>
            <input type="text" placeholder='Licence Plate' onChange={(e) => setPlate(e.target.value)} value={plate}/>
            <input type="text" placeholder='Vehicle Type' onChange={(e) => setType(e.target.value)} value={type}/>
            <input type="text" placeholder='Vehicle Subtype' onChange={(e) => setSubtype(e.target.value)} value={subtype}/>
            <input type="text" placeholder='Data From' onChange={(e) => setFrom(e.target.value)} value={from}/>
            <input type="text" placeholder='Date To' onChange={(e) => setTo(e.target.value)} value={to}/>
          </div>
          <input className='submitBtn' type="submit" value="Submit"/>
        </form>

        <div className={'data'}>
          {data && data.map((item, index) => {
            return (
                <div className={'dataItem'} key={index}>
                  <div className={'dataItemImage'}>
                    <img src={`https://tolltax.xyz${item.image}`} alt={item.image}/>
                  </div>
                  <div className={'dataItemTitle'}>
                    <span>{item.licence_plate}</span>
                  </div>
                  <div className={'dataItemContent'}>
                    <div className={'dataItemContentItem'}>
                      <span>{item.vehicle_type}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      <span>{item.vehicle_subtype}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      <span>{item.datefrom}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      <span>{item.dateto}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      <span>{item.total_amount}</span>
                    </div>
                  </div>
                </div>
            )
          })}
        </div>

      </div>
  )
}

export default App
