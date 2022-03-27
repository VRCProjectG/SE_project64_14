import './style/Login.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function Login() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [dataEmailPass, setEmailPass] = useState([]);

    const [CheckPass, setCheckPass] = useState(false);

    function getEmailPass(username,password){
        Axios.get(`http://localhost:3001/user/${username}/${password}`).then((response) => {
            setEmailPass(response.data);
        });
    }
    

    // const getEmailPass = (username,password) => {
    //     Axios.get(`http://localhost:3001/user/${username}/${password}`).then((response) => {
    //         setEmailPass(response.data);
    //     });

    //     console.log(username + " " + password);
    //     console.log(dataEmailPass);
    // };

    // Navigate to Register
    const navigate = useNavigate();
    const registerPage = () => {
        navigate('/Register');
    }
    // ///Navigate to Reservation
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const usernameInput = (e) => {
    //     setUsername(e.target.value);
    // }
    // const passwordInput = (e) => {
    //     setPassword(e.target.value);
    // }
    
    const submitLoginForm = (e) => 
    {
        e.preventDefault();
        getEmailPass(username,password);

        setCheckPass(true);
    }

    const CheckPassEvent = (dataEmailPass) =>
    {
        if(CheckPass && dataEmailPass.length == 1){
            if(dataEmailPass[0].StatusAcc){
                navigate('/Reservation/VaccinePlace',{ state: {id: dataEmailPass[0]}});
            }
            else{
                navigate('/Reservation/StatusCheck',{ state: {id: dataEmailPass[0]}});
            }
        }
    }

    return (
        <>
            <div className="loginContainer">
                <form className="loginForm"onSubmit={submitLoginForm} >
                    <div className="headTitle">เข้าสู่ระบบจองวัคซีน</div>
                    <div className="username">
                        <div className="title">ชื่อผู้ใช้</div>
                        <input name="username" type="text" placeholder="กรอกชื่อผู้ใช้" onChange={(event) => { setUsername(event.target.value) }} />
                    </div>
                    <div className="password">
                        <div className="title">รหัสผ่าน</div>
                        <input name="password" type="password" placeholder="กรอกรหัสผ่าน" onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div className="optional">
                        <div className="registerButton" onClick={registerPage}>สมัครสมาชิก</div>
                    </div>
                    <button type="submit">เข้าสู่ระบบ</button>
                </form>
                {CheckPassEvent(dataEmailPass)}
            </div>

        </>
    )
}

export default Login;