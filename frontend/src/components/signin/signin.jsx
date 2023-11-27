import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hook/useAuth";


const Signin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const {setAuth} = useAuth()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!email || !password){
            toast.error("Invalid Entry")  
            return
        }
        
        try{
            setLoading(true)
            const response = await axios.post('/auth/login',
                JSON.stringify({
                    email,
                    password,
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
                <h4>Login</h4>
                <p>Login with your MedAssist credentials</p>
            </div>
            <div className="form-body">
                <div className="input-container">
                    <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email'/>
                    <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password'/>
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

                <div className="cta-container">
                    <button onClick={handleSubmit} className="cta-btn">
                        {loading ? 'Loading...' : 'Login'}
                    </button>

                    <div className="bottom-cta">
                        <p>Not a member yet?</p>
                        <a href='/signup'>Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin