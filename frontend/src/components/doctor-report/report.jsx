import { useEffect, useRef, useState } from "react"
import axios from "../../api/axios"
import toast, { Toaster } from 'react-hot-toast';

const Report = () => {
  const [loading,setLoading] = useState(false)
  const token = useRef()

  useEffect(() =>{
    const userToken = JSON.parse(localStorage.getItem('user'));
    token.current = userToken.token
  },[])

  const exportReport = async() =>{
    setLoading(true)
    try{
      const response = await axios.get('med/report',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.current}`,
          }
        }
      );
      setLoading(false)
      toast.success(response.data.msg);
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
    <div className="empty-container">
      <button onClick={exportReport}  className='empty-inner-cta'>{loading ? 'Exporting': 'Export Report'}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="white"/>
        </svg>
      </button>
      <Toaster 
        toastOptions={{
            style: {
              fontFamily: 'Montserrat'
            },
        }}
      />
    </div>
  )
}

export default Report