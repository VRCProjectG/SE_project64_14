// CSS
import './style/NavbarStudent.css';
// IMG
import userLogo from './img/user.png';
import dotLogo from './img/dot.png';
import petitionLogo from './img/petition.png';
import validationLogo from './img/validation.png';
import reportLogo from './img/report.png'
import checkLogo from './img/check.png';
// NAVBAR
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import Axios from "axios";

function NavbarStudent(props) {

    const { state } = useLocation();
    const { id } = state

    const [dataRequest, setRequest] = useState([]);
    const [ReportIntern, setReportIntern] = useState([]);

    function getRequestFromNameId(Id) {
        Axios.get(`http://localhost:3001/RequestPetition/${Id}`).then((response) => {
            setRequest(response.data);
        });
    }

    function getReportIntern(nisit_ID) {
        Axios.get(`http://localhost:3001/ReportIntern/${nisit_ID}`).then((response) => {
            setReportIntern(response.data);
        });
    }

    useEffect(() => {
        getRequestFromNameId(id.Nisit_ID);
        getReportIntern(id.Nisit_ID)
    }, [])

    const page = props.pageNum;
    let page1 = false;
    let page2 = false;
    let page3 = false;
    let page4 = false;
    let page5 = false;
    if (page === "1") {
        page1 = true;
    } else if (page === "2") {
        page2 = true;
    } else if (page === "3") {
        page3 = true;
    } else if (page === "4") {
        page4 = true;
    } else if (page === "5") {
        page5 = true;
    }


    const navigate = useNavigate();
    const homeInternshipPage = () => {
        navigate('/StudentInternship/HomeInternship', { state: { id: id } })
    }
    const petitionInternshipPage = () => {
        if (dataRequest.find((FindData) => { return FindData.Status_re === 'อนุมัติ' }) !== undefined)
            alert("ผ่านการอนุมัติแล้ว")
        else if (dataRequest.find((FindData) => { return FindData.Status_re === 'รอการอนุมัติ' }) !== undefined)
            alert("รอการอนุมัติ")
        else navigate('/StudentInternship/PetitionInternship', { state: { id: id } })
    }
    const approveValidationPage = () => {
        navigate('/StudentInternship/ApproveValidation', { state: { id: id } })
    }
    const reportInternshipPage = () => {
        if (dataRequest.find((FindData) => { return FindData.Status_re === 'อนุมัติ' }) === undefined)
            alert("ต้องผ่านการพิจารณาอนุมัติคำร้องฝึกงานก่อน")
        else if (ReportIntern.find((FindData) => { return FindData.nisit_ID === id.Nisit_ID }) === undefined)
            alert("ต้องมีการส่งเอกสารจากอาจารย์หรือเจ้าหน้าที่")
        else if (ReportIntern.find((FindData) => { return FindData.F_Status === 'รอการตรวจสอบ' }) !== undefined)
            alert("รอการตรวจสอบ")
        else if (ReportIntern.find((FindData) => { return FindData.F_Status === 'ผ่าน' }) !== undefined)
            alert("ผ่านการอนุมัติแล้ว")
        else navigate('/StudentInternship/ReportInternship', { state: { id: id } })
    }
    const internshipValidationPage = () => {
        navigate('/StudentInternship/InternshipValidation', { state: { id: id } })
    }

    return (
        <>
            <div className="studentNavContainer">
                <nav className="studentNav">
                    <div className="userInfo">
                        <div className='profile'><img src={userLogo} /></div>
                        <div className='detail'>
                            <div className="name">{id.NAME}</div>
                            <div className="priority">นิสิต</div>
                        </div>
                    </div>
                    <div className="studentPage">
                        <div className={page1 ? "link_Selected" : "homeInternshipPage"} onClick={homeInternshipPage}>
                            <img src={dotLogo} />
                            <div class="title">หน้าหลัก</div>
                        </div>
                        <div className={page2 ? "link_Selected" : "petitionInternshipPage"} onClick={petitionInternshipPage}>
                            <img src={petitionLogo} />
                            <div class="title">คำร้องฝึกงาน</div>
                        </div>
                        <div className={page3 ? "link_Selected" : "approveValidation"} onClick={approveValidationPage}>
                            <img src={validationLogo} style={{ width: "3rem" }} />
                            <div class="title">ตรวจสอบผลการอนุมัติ</div>
                        </div>
                        <div className={page4 ? "link_Selected" : "reportInternship"} onClick={reportInternshipPage}>
                            <img src={reportLogo} style={{ width: "3rem" }} />
                            <div class="title">รายการการฝึกงาน</div>
                        </div>
                        <div className={page5 ? "link_Selected" : "internshipValidation"} onClick={internshipValidationPage}>
                            <img src={checkLogo} />
                            <div class="title">ตรวจสอบผลการฝึกงาน</div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarStudent;