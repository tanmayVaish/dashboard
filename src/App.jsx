import {useEffect, useState} from 'react'
import './App.css'
import axios, {Axios} from "axios";

function App() {

  const [plate, setPlate] = useState(null);
  const [type, setType] = useState("truck");
  const [subtype, setSubtype] = useState(null);
  const [from , setFrom] = useState('2010-08-01T00:00:00');
  const [to , setTo] = useState('2021-09-01T00:00:00');
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchData = async (e) => {
    e.preventDefault();
    await axios.post('https://tolltax.xyz/demoapi/dashboard', {
      licence_plate: plate,
      vehicle_type: type,
      vehicle_subtype: subtype,
      datefrom: from,
      dateto: to,
    }).then(async function (response) {
      setData(response.data.data);
      await fetchImage(response);
      await fetchVideo(response);
    }).catch(function (error) {
      console.log(error);
    });
  }



  const fetchVideo = async (d) => {
    const url = []
    for(let i=0;i<d.data.data.length;i++) {
      await fetch('https://tolltax.xyz/demoapi/get_videoclip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          filepath: d.data.data[i].videoclip,
        })
      }).then((response) => {
        return response.blob();
      }).then((res) => {
        url.push(URL.createObjectURL(res));
        // setVideo([...video, URL.createObjectURL(res)]);
      });
    }
    setVideo(url);
  }



  const fetchImage = async (d) => {
    const url = []
    for(let i=0;i<d.data.data.length;i++) {
      await fetch('https://tolltax.xyz/demoapi/get_file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          filepath: d.data.data[i].image,
        })
      }).then((response) => {
        return response.blob();
      }).then((res) => {
        url.push(URL.createObjectURL(res));
      });
    }
    setImages(url);
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
                  <div className={'dataItemTitle'}>
                    Vehicle Number: {index+1}
                  </div>
                  <div className={'dataItemImage'}>
                    Image
                    <img src={images[index]} alt={'truck'}/>
                  </div>
                  <div className={'dataItemContent'}>
                    <div className={'dataItemContentItem'}>
                      License Plate No.:
                      <span>{item.licence_plate}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Vehicle Type:
                      <span>{item.vehicle_type}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Vehicle Subtype:
                      <span>{(item.vehicle_subtype)?item.vehicle_subtype:"Not Available"}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Lane No.:
                      <span>{(item.lane_no)?item.lane_no:"Not Available"}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Job ID:
                      <span>{(item.jobid)?item.jobid:"Not Available"}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Time:
                      <span>{item.time}</span>
                    </div>
                    <div className={'dataItemContentItem'}>
                      Video
                      <video src={video[index]} controls/>
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
