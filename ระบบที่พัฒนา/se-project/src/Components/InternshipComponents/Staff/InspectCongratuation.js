// CSS
import './style/InspectCongratuation.css';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Axios from "axios";

function InspectCongratuation() {

    const { state } = useLocation();
    const { Id, DataId } = state;

    const navigate = useNavigate();

    const [finalIntern, setfinalIntern] = useState([]);
    const [Status, setStatus] = useState([]);

    function getfinalIntern(nisit_ID) {
        Axios.get(`http://localhost:3001/ReportIntern/${nisit_ID}`).then((response) => {
            setfinalIntern(response.data);
        });
    }

    useEffect(() => {
        getfinalIntern(Id.Nisit_ID)
    }, [])

    const previousPage = () => {
        navigate('/StaffInternship/CongratuationApprove',{state: { id: DataId }});
    }
    const disapprovedCongratuationPage = () => {
        console.log(DataId);
        navigate('/StaffInternship/DisaprovedCongratuation', { state: { Id: Id, DataId: DataId } });
    }

    const updateData = (nisit_ID) => {
        Axios.put("http://localhost:3001/status/update/congrat", {
            F_Status: "ผ่าน",
            nisit_ID: nisit_ID,
            F_Descrip: "",
        }).then((response) => {
            setStatus(
                Status.map((val) => {
                    return val.nisit_ID == nisit_ID ? {
                        nisit_ID: val.nisit_ID,
                        F_Status: "ผ่าน",
                        F_Descrip: "",
                    } : val;
                })
            )
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        updateData(Id.Nisit_ID);
        navigate('/StaffInternship/CongratuationApprove',{state: {id: DataId}});
    }

    return (
        <>
            <div className="inspectCongratuationContainer">
                <div className='inspectCongratuationSection'>
                    <div className="back" onClick={previousPage} >&#8592;</div>
                    <div className='title'>
                        <h2>ตรวจสอบเอกสารอนุมัติคำร้องขอจบการศึกษาของ "<span>{Id.NAME}</span>"</h2>
                        <hr />
                    </div>
                    <form className='inspectCongratuationForm' >
                        <div className='inspect'>
                            <div className='title'>
                                <h3>ตรวจสอบเอกสารอนุมัติคำร้องขอจบการศึกษา</h3>
                                รายงานการฝึกงาน <div><a href={finalIntern.map((data) => { return data.Up_Report })}>คลิกเพื่อดู</a></div>
                                ไฟล์นำเสนอฝึกงาน <div><a href={finalIntern.map((data) => { return data.Up_Report2 })}>คลิกเพื่อดู</a></div>
                            </div>
                        </div>
                        <div className='button'>
                            <button type='submit' onClick={submitForm}>อนุมัติ</button>
                            <button onClick={disapprovedCongratuationPage}>ไม่อนุมัติ</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InspectCongratuation;