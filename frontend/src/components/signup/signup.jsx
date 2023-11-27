import { useState } from 'react'
import './style.css'
import toast, { Toaster } from 'react-hot-toast';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

const Signup = () => {
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [cPassword,setCPassword] = useState('')
    const [role,setRole] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const {setAuth} = useAuth()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!email || !fullName || !password || !cPassword || !role){
            toast.error("Invalid Entry")  
            return
        }
        
        try{
            setLoading(true)
            const response = await axios.post('/auth/signup',
                JSON.stringify({
                    fullName,
                    email,
                    password,
                    role
                }),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            localStorage.setItem('user',JSON.stringify(response.data))
            const userDetails = response.data.user
            const token = response.data.token
            setAuth({userDetails,token})
            toast.success('Success')
            setLoading(false)
            navigate('/');
        }catch(err){
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
    <div className="signup-container">
        <div className="signup-left-container">
            <div className="signup-left-container-text">
                <div className="logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="48" viewBox="0 0 60 48" fill="none">
                        <path d="M19.799 3H45.0969L26.4979 30.5675H1.19995L19.799 3Z" fill="#F15323"/>
                        <path d="M20.907 33.1224L13.7031 43.8H40.2011L58.8001 16.2325H39.243L27.8478 33.1224H20.907Z" fill="#315EF5"/>
                    </svg>
                    <h4>MedAssist</h4>
                </div>
                <p>Elevating Your Wellness with Personalized Medication Reminders.</p>
            </div>
        </div>

        <div className="form-container">
            <div className="form-title">
                <h4>Sign up</h4>
                <p>Let’s get you registered on MedAssist</p>
            </div>
            <div className="form-body">
                <div className="input-container">
                    <input required value={fullName} onChange={(e)=>setFullName(e.target.value)} type="text" placeholder='Fullname'/>
                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email'/>
                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'/>
                    <input required value={cPassword} onChange={(e)=>setCPassword(e.target.value)} type="password" placeholder='Confirm Password'/>
                </div>
                <div className="cta-container">
                    <div className="signup-as">
                        <p>Sign up as:</p>
                        <div className="signup-as-checkbox">
                            <div className="patient-checkbox">
                                <input  onChange={(e)=> setRole(e.target.value)} type="radio" value="patient" name="role" id="role" />
                                <p>Patient</p>
                            </div>
                            <div className="patient-checkbox">
                                <input  onChange={(e)=> setRole(e.target.value)} type="radio" value="doctor" name="role" id="role" />
                                <p>Doctor</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Toaster 
                            toastOptions={{
                                style: {
                                fontFamily: 'Montserrat'
                                },
                            }}
                        />
                    </div>

                    {/* {errorMessage && <p className='error'>!{errorMessage}</p>} */}
                    <button onClick={handleSubmit} className="cta-btn">
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>

                    <div className="bottom-cta">
                        <p>Already a member?</p>
                        <a href='/login'>Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup