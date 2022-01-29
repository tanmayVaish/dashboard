import { useState } from 'react'
import './App.css'
import axios, {Axios} from "axios";

function App() {

  const [plate, setPlate] = useState(null);
  const [type, setType] = useState("truck");
  const [subtype, setSubtype] = useState(null);
  const [from , setFrom] = useState('2010-08-01T00:00:00');
  const [to , setTo] = useState('2021-09-01T00:00:00');


  const fetchData = async (e) => {
    e.preventDefault();
    await axios.post('https://tolltax.xyz/demoapi/dashboard', {
      licence_plate: plate,
      vehicle_type: type,
      vehicle_subtype: subtype,
      datefrom: from,
      dateto: to,
    }).then(function (response) {
      console.log(response);
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
        <table className="divide-y divide-white">
          <thead className={'bg-gray-500'}>
          <tr>
            <th
                scope={'col'}
                className={
                  'p-2 text-left text-lg font-medium text-white uppercase tracking-wider'
                }
            >
              Long-URL
            </th>
            <th
                scope="col"
                className="p-2 text-left text-lg font-medium text-white uppercase tracking-wider"
            >
              Short-URL
            </th>
            <th
                scope="col"
                className="p-2 text-left text-lg font-medium text-white uppercase tracking-wider"
            >
              Clicks
            </th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        asdf
                      </div>
                    </div>
                  </div>
                </td>
                <td className={'px-6 py-4 whitespace-nowrap'}>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        asdf
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    sladfkj
                  </span>
                </td>
              </tr>
          </tbody>
        </table>
        </div>

      </div>
  )
}

export default App
