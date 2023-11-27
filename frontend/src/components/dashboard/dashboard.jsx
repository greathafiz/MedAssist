import './style.css'
import GreenMark from '../../assets/green-mark.svg'
import Failed from '../../assets/Frame 1327.svg'
import Jar from '../../assets/pill-jar.svg'
import UpcomingInfo from '../upcoming-info'
import { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios'
import toast, { Toaster } from 'react-hot-toast';
import Empty from '../emptyDashboard/empty'

const Dashboard = () => {
    const [loading,setLoading] = useState(false)
    const token = useRef()
    const [medData,setMedData] = useState([])

    useEffect(() =>{
      const userToken = JSON.parse(localStorage.getItem('user'));
      token.current = userToken.token
      if(token.current){
        fetchMeds()
      }
    },[])

    const fetchMeds = async() =>{
      setLoading(true)
      try{
        const response = await axios.get('/med',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.current}`,
            }
          }
        );
        setMedData(response.data.msg)
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

    if(loading){
      <p>Loading</p>
    }
  return (
    <>
      {!medData && !loading ? (
        <Empty />
      ):(
        <div className='dashboard-container'>
          <div className="board">
            <div className="top-board">

              <h3 className='top-board-head'>How you did last week</h3>
              
              <div className="analytics-container">
                <div className="analytics">
                  <div className="analytics-data">
                    <div className="analytics-data-status">
                      <img src={GreenMark} alt="" />
                      <h5>Taken</h5>
                    </div>

                    <div className="analytics-data-score">
                      <p className='score-1'>{medData?.takenMeds}</p>
                      <p className='score-total'>/{medData?.totalMeds}</p>
                    </div>

                    <p className='analytics-sum'>Doses</p>
                  </div>
                  

                  <div className="analytics-data">
                    <div className="analytics-data-status">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                        <rect y="0.5" width="19" height="19" rx="6" fill="#A7A7A7"/>
                        <path d="M6.29387 5.20129C6.15222 5.06881 5.96488 4.99669 5.7713 5.00012C5.57772 5.00355 5.39303 5.08226 5.25613 5.21967C5.11923 5.35708 5.04081 5.54247 5.03739 5.73677C5.03398 5.93107 5.10583 6.11912 5.23782 6.26129L8.94395 9.98129L5.23782 13.7013C5.16441 13.77 5.10552 13.8528 5.06468 13.9448C5.02385 14.0368 5.00189 14.1361 5.00012 14.2368C4.99835 14.3375 5.0168 14.4375 5.05438 14.5309C5.09196 14.6243 5.1479 14.7091 5.21885 14.7803C5.2898 14.8515 5.37432 14.9077 5.46736 14.9454C5.5604 14.9831 5.66006 15.0017 5.76039 14.9999C5.86071 14.9981 5.95966 14.9761 6.05131 14.9351C6.14297 14.8941 6.22546 14.835 6.29387 14.7613L10 11.0413L13.7061 14.7613C13.7745 14.835 13.857 14.8941 13.9487 14.9351C14.0403 14.9761 14.1393 14.9981 14.2396 14.9999C14.3399 15.0017 14.4396 14.9831 14.5326 14.9454C14.6257 14.9077 14.7102 14.8515 14.7811 14.7803C14.8521 14.7091 14.908 14.6243 14.9456 14.5309C14.9832 14.4375 15.0017 14.3375 14.9999 14.2368C14.9981 14.1361 14.9762 14.0368 14.9353 13.9448C14.8945 13.8528 14.8356 13.77 14.7622 13.7013L11.056 9.98129L14.7622 6.26129C14.8942 6.11912 14.966 5.93107 14.9626 5.73677C14.9592 5.54247 14.8808 5.35708 14.7439 5.21967C14.607 5.08226 14.4223 5.00355 14.2287 5.00012C14.0351 4.99669 13.8478 5.06881 13.7061 5.20129L10 8.92129L6.29387 5.20129Z" fill="white"/>
                      </svg>
                      <h5>Skipped</h5>
                    </div>

                    <div className="analytics-data-score">
                      <p className='score-1'>{medData?.missedMeds}</p>
                      <p className='score-total'>/{medData?.totalMeds}</p>
                    </div>

                    <p className='analytics-sum'>Doses</p>
                  </div>


                  <div className="analytics-data">
                    <div className="analytics-data-status">
                      <img src={Failed} alt="" />
                      <h5>Missed</h5>
                    </div>

                    <div className="analytics-data-score">
                      <p className='score-1'>{medData?.missedMeds}</p>
                      <p className='score-total'>/{medData?.totalMeds}</p>
                    </div>

                    <p className='analytics-sum'>Doses</p>
                  </div>
                </div>

                  <div className="adherence-container">
                    <div className="circle">
                      <div className="circle-text">
                        <p className="number">{medData?.percentageAdherence}</p>
                        <p className="percent">%</p>
                      </div>
                    </div>
                    <h4>Adherence</h4>
                  </div>
              </div>

              <div className="report-cta">
                <p>See the full report</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="16" viewBox="0 0 23 16" fill="none">
                  <path d="M22.7071 8.70711C23.0976 8.31658 23.0976 7.68342 22.7071 7.29289L16.3431 0.928932C15.9526 0.538408 15.3195 0.538408 14.9289 0.928932C14.5384 1.31946 14.5384 1.95262 14.9289 2.34315L20.5858 8L14.9289 13.6569C14.5384 14.0474 14.5384 14.6805 14.9289 15.0711C15.3195 15.4616 15.9526 15.4616 16.3431 15.0711L22.7071 8.70711ZM0 9H22V7H0V9Z" fill="#407BFF"/>
                </svg>
              </div>
            </div>

            <div className="bottom-board">
              <div className="active-board">
                  <h4>Active Medications</h4>
                  <div className="list-container">
                    {medData?.activeMeds?.slice().reverse().slice(0,5).map((item)=>(
                      <div key={item._id} className="list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                          <path d="M10.8715 0C9.33335 0.0257047 7.94406 0.935762 7.31558 2.34296L14.8409 4.59787C15.1716 2.64048 13.9863 0.742703 12.0788 0.166807C11.737 0.0639884 11.3787 0.00765673 11.0203 0H10.8715ZM7.0289 3.28583C6.69261 5.24869 7.87791 7.15194 9.79093 7.72619C11.7095 8.30045 13.7548 7.35976 14.5597 5.53855L7.0289 3.28583ZM21.666 5.7081C20.2712 5.71356 18.7882 6.38079 17.669 7.95042L10.7888 17.6253C8.94192 20.2176 9.74683 22.9303 11.5661 24.21C13.3909 25.4953 16.2301 25.3476 18.077 22.7553L24.9518 13.0859C26.7986 10.4881 25.9937 7.78088 24.1744 6.49564C23.4908 6.01436 22.6694 5.73544 21.8038 5.7081H21.666ZM21.5668 6.65425C21.6384 6.65425 21.7101 6.65425 21.7763 6.65972C22.4433 6.68706 23.0718 6.92223 23.6011 7.2996C25.0179 8.29498 25.7291 10.2803 24.1358 12.5171L20.5799 17.5213C18.6063 16.9963 16.0703 15.2079 14.918 13.5289L18.485 8.51921C19.4167 7.2121 20.5248 6.67613 21.5668 6.65425ZM3.9168 10.8217C3.38644 10.8272 2.86326 10.9366 2.37701 11.1498C0.551644 11.9429 -0.398251 13.9664 0.158565 15.8697L7.3652 12.7468C6.64299 11.5382 5.33089 10.8053 3.9168 10.8217ZM7.75662 13.6438L0.551093 16.7721C1.56825 18.4894 3.71006 19.1785 5.5459 18.3855C7.37622 17.587 8.32446 15.5525 7.75662 13.6438Z" fill="#404040"/>
                        </svg>
                          <p >{item.medicationName}</p>
                      </div>
                    ))}
                  </div>
              </div>

              <div className="stock-board empty-container">

                  <h4>Stock Management</h4>
                  {/* <div className="list">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                      <path d="M10.8715 0C9.33335 0.0257047 7.94406 0.935762 7.31558 2.34296L14.8409 4.59787C15.1716 2.64048 13.9863 0.742703 12.0788 0.166807C11.737 0.0639884 11.3787 0.00765673 11.0203 0H10.8715ZM7.0289 3.28583C6.69261 5.24869 7.87791 7.15194 9.79093 7.72619C11.7095 8.30045 13.7548 7.35976 14.5597 5.53855L7.0289 3.28583ZM21.666 5.7081C20.2712 5.71356 18.7882 6.38079 17.669 7.95042L10.7888 17.6253C8.94192 20.2176 9.74683 22.9303 11.5661 24.21C13.3909 25.4953 16.2301 25.3476 18.077 22.7553L24.9518 13.0859C26.7986 10.4881 25.9937 7.78088 24.1744 6.49564C23.4908 6.01436 22.6694 5.73544 21.8038 5.7081H21.666ZM21.5668 6.65425C21.6384 6.65425 21.7101 6.65425 21.7763 6.65972C22.4433 6.68706 23.0718 6.92223 23.6011 7.2996C25.0179 8.29498 25.7291 10.2803 24.1358 12.5171L20.5799 17.5213C18.6063 16.9963 16.0703 15.2079 14.918 13.5289L18.485 8.51921C19.4167 7.2121 20.5248 6.67613 21.5668 6.65425ZM3.9168 10.8217C3.38644 10.8272 2.86326 10.9366 2.37701 11.1498C0.551644 11.9429 -0.398251 13.9664 0.158565 15.8697L7.3652 12.7468C6.64299 11.5382 5.33089 10.8053 3.9168 10.8217ZM7.75662 13.6438L0.551093 16.7721C1.56825 18.4894 3.71006 19.1785 5.5459 18.3855C7.37622 17.587 8.32446 15.5525 7.75662 13.6438Z" fill="#404040"/>
                    </svg>
                    <p>Paracetamol <span>50mg</span></p>
                  </div> */}
                  <div className="empty">
                    <img src={Jar} alt="" />
                    <h4>No Refill information</h4>
                  </div>
              </div>
            </div>
            <Toaster 
              toastOptions={{
                  style: {
                    fontFamily: 'Montserrat'
                  },
              }}
            />
          </div>

          <UpcomingInfo />
        </div>
      )}
    </>
  )
}

export default Dashboard