// CSS
import './style/Login.css';
// IMG
import logo from './img/KU_Logo.png';
// Utils
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Axios from 'axios'

function Login() {
    // Navigate to Register
    const navigate = useNavigate();
    // Navigate to Reservation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [Nisit, setNisit] = useState([]);
    const [Admin, setAdmin] = useState([]);

    function getNisit() {
        Axios.get(`http://localhost:3001/nisit`).then((response) => {
            setNisit(response.data);
        });
    }

    function getAdmin() {
        Axios.get(`http://localhost:3001/admin`).then((response) => {
            setAdmin(response.data);
        });
    }

    useEffect(() => {
        getNisit();
        getAdmin();
    },[])

    const submitLoginForm = (e) => 
    {
        e.preventDefault();
        const NisitData = Nisit.find((data) => { return data.Nisit_ID === username});
        if(NisitData === undefined) {

            const AdminData = Admin.find((data) => { return data.Admin_ID === username});

            if(AdminData === undefined) AlertIdPass();
            else if(AdminData.Admin_pass === password) navigate('/StaffInternship/Company',{ state: {id: AdminData}});
            else AlertIdPass();

        }
        else if(NisitData.Nisit_pass === password) navigate('/StudentInternship/HomeInternship',{ state: {id: NisitData}});
        else AlertIdPass();
    }

    const AlertIdPass = () => {
        alert("ID หรือ Password ไม่ถูกต้อง");
    }
    
    return (
        <>
            <div className="loginContainer">
                <form className="loginForm" onSubmit={submitLoginForm}>
                    <div className='logo'>
                        <img src={logo} />
                    </div>
                    <div className="headTitle">เข้าสู่ระบบการฝึกงาน</div>
                    <div className="username">
                        <div className="title">บัญชีผู้ใช้เครือข่าย Nontri</div>
                        <input name="username" type="text" placeholder="เช่น b622*****87 หรือ reg***" onChange={(event) => { setUsername(event.target.value) }} />
                    </div>
                    <div className="password">
                        <div className="title">รหัสผ่าน</div>
                        <input name="password" type="password" placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่าย Nontri" onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
            
                    <button type="submit">เข้าสู่ระบบ</button>
                </form>

            </div>
        </>
    )
}

export default Login;