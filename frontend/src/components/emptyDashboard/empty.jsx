import './style.css'
import EmptyIcon from '../../assets/empty-icon.svg'
import axios from '../../api/axios';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Empty = () => {
    const [firstModal,setFirstModal] = useState(false)
    const [secondModal,setSecondModal] = useState(false)
    const [medicationName,setMedicationName] = useState('')
    const [frequency,setFrequency] = useState('')
    const [reminders,setReminders] = useState([])
    const token = useRef()
    const [loading,setLoading] = useState(false)


    useEffect(() =>{
        const userToken = JSON.parse(localStorage.getItem('user'));
        token.current = userToken.token
      },[])
    const addMeds = async() =>{
        if(reminders){
            setLoading(true)
            try{
                const response = await axios.post('/med',
                JSON.stringify({
                    medicationName,
                    frequency: 'Every day',
                    reminders
                }),
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.current}`,
                    }
                }
                );
                toast.success(response.data.msg);
                setLoading(false)
                setSecondModal(false)
                setMedicationName('')
                setFrequency('')
                setReminders([])

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
    }

    const handleTime1Change = (e) => {
        const newReminderValues = [...reminders];
        newReminderValues[0] = e.target.value;
        setReminders(newReminderValues);
    };
    
    const handleTime2Change = (e) => {
        const newReminderValues = [...reminders];
        newReminderValues[1] = e.target.value;
        setReminders(newReminderValues);
    };

    const handleTime3Change = (e) => {
        const newReminderValues = [...reminders];
        newReminderValues[2] = e.target.value;
        setReminders(newReminderValues);
    };

    const handleClick = () =>{
        if(medicationName && frequency){
            setFirstModal(false); 
            setSecondModal(true)
        }
    }
        
    return (
        <>
            <div className='empty-container'>
                <div className="empty-inner">
                    <div className="empty-inner-text">
                        <img src={EmptyIcon} alt="" />
                        <p>Hello, nothing to see here yet!... Add Meds to get started.</p>
                    </div>
                    <button onClick={()=> setFirstModal(true)} className="empty-inner-cta">
                        Add Meds
                    </button>   
                </div>
            </div>

            <Toaster 
              toastOptions={{
                  style: {
                    fontFamily: 'Montserrat'
                  },
            }} />

            {firstModal && (
                <div className="modal-container" onClick={()=>setFirstModal(false)}>
                    <div onClick={(e)=> e.stopPropagation()} className="modal">
                        <div className="input-container">
                            <h4>What med would you like to add?</h4>
                            <input value={medicationName} onChange={(e)=>setMedicationName(e.target.value)} type="text" />
                        </div>
                        <div className="options-container">
                            <h4>How often do you take it?</h4>
                            <div className="options">
                                <p onClick={()=>setFrequency('Every day')} className="option">Every day</p>
                                <p onClick={()=>setFrequency('Twice a day')} className="option">Twice a day</p>
                                <p onClick={()=>setFrequency('3 times a day')} className="option">3 times a day</p>
                            </div>
                        </div>
                        <button onClick={handleClick}  className='empty-inner-cta'>Next</button>
                    </div>
                </div>
            )}

            {secondModal && (
                <div className="modal-container" onClick={()=>setSecondModal(false)}>
                    <div onClick={(e)=> e.stopPropagation()} className="modal">
                        <div className="input-container">
                            <h4>What time do you need to take the first dose?</h4>
                            <input value={reminders[0] || ''} onChange={handleTime1Change} type="time" />
                        </div>
                        
                        <div className="input-container">
                            <h4>What time do you need to take the second dose?</h4>
                            <input value={reminders[1] || ''} onChange={handleTime2Change} type="time" />
                        </div>

                        {frequency === 'Every day' && (
                            <div className="input-container">
                                <h4>What time do you need to take the third dose?</h4>
                                <input value={reminders[2] || ''} onChange={handleTime3Change} type="time" />
                            </div>
                        )}
                        
                        {frequency === '3 times a day' && (
                            <div className="input-container">
                                <h4>What time do you need to take the third dose?</h4>
                                <input value={reminders[2] || ''} onChange={handleTime3Change} type="time" />
                            </div>
                        )}
                        
                        <button onClick={addMeds}  className='empty-inner-cta'>{loading ? 'Loading': 'Next'}</button>
                    </div>
                </div>
            )}
        </>
    )
}


export default Empty