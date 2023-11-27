import { useEffect, useRef, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import axios from "../../api/axios";

const Doctor = () => {
  const [patientData,setPatientData] = useState([])
  const [loading,setLoading] = useState(false)
  const token = useRef()

  useEffect(() =>{
    const userToken = JSON.parse(localStorage.getItem('user'));
    token.current = userToken?.token
    if(token.current){
      fetchData()
    }else{
      window.location.href = '/login'
    }
  },[])

  const fetchData = async() =>{
    setLoading(true)
    try{
      const response = await axios.get('/patients',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.current}`,
          }
        }
      );
      setPatientData(response.data.msg)
      setLoading(false)
    }

    catch(err){
      setLoading(false)
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error occurred while processing the request');
      }
    }
  }
  return (
    <div className="container">

      {patientData.length === 0 ? (
        <p>No data available</p>
      ):(  
        <div className="medication-body-container">
          {patientData.map((item)=>(
            <div key={item._id} className="medication-body">
              <div className="medication-body-inner">
                <div className="medication-name">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                    <path d="M10.8715 0C9.33335 0.0257047 7.94406 0.935762 7.31558 2.34296L14.8409 4.59787C15.1716 2.64048 13.9863 0.742703 12.0788 0.166807C11.737 0.0639884 11.3787 0.00765673 11.0203 0H10.8715ZM7.0289 3.28583C6.69261 5.24869 7.87791 7.15194 9.79093 7.72619C11.7095 8.30045 13.7548 7.35976 14.5597 5.53855L7.0289 3.28583ZM21.666 5.7081C20.2712 5.71356 18.7882 6.38079 17.669 7.95042L10.7888 17.6253C8.94192 20.2176 9.74683 22.9303 11.5661 24.21C13.3909 25.4953 16.2301 25.3476 18.077 22.7553L24.9518 13.0859C26.7986 10.4881 25.9937 7.78088 24.1744 6.49564C23.4908 6.01436 22.6694 5.73544 21.8038 5.7081H21.666ZM21.5668 6.65425C21.6384 6.65425 21.7101 6.65425 21.7763 6.65972C22.4433 6.68706 23.0718 6.92223 23.6011 7.2996C25.0179 8.29498 25.7291 10.2803 24.1358 12.5171L20.5799 17.5213C18.6063 16.9963 16.0703 15.2079 14.918 13.5289L18.485 8.51921C19.4167 7.2121 20.5248 6.67613 21.5668 6.65425ZM3.9168 10.8217C3.38644 10.8272 2.86326 10.9366 2.37701 11.1498C0.551644 11.9429 -0.398251 13.9664 0.158565 15.8697L7.3652 12.7468C6.64299 11.5382 5.33089 10.8053 3.9168 10.8217ZM7.75662 13.6438L0.551093 16.7721C1.56825 18.4894 3.71006 19.1785 5.5459 18.3855C7.37622 17.587 8.32446 15.5525 7.75662 13.6438Z" fill="#404040"/>
                  </svg>
                  <p className='drug-type'>{item.fullName}</p>
                </div>
                <p className='status'>{item.email}</p>
                <Toaster 
                  toastOptions={{
                      style: {
                        fontFamily: 'Montserrat'
                      },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Doctor