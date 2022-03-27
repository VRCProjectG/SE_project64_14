// CSS
import './style/HomeInternship.css';
// Components
import NavbarStudent from './ReuseComponents/NavbarStudent';
import HeaderStudent from './ReuseComponents/HeaderStudent';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

import Axios from 'axios'

function HomeInternship() {

    const { state } = useLocation();
    const { id } = state;

    const [Location, setLocation] = useState([]);
    const [dataRequest, setRequest] = useState([]);
    const [ReportIntern, setReportIntern] = useState([]);

    function getLocation() {
        Axios.get(`http://localhost:3001/LocationInternship`).then((response) => {
            setLocation(response.data);
        });
    }

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
        getLocation()
    }, []);

    const DataSelect = () => {
        if (ReportIntern.find((FindData) => { return FindData.nisit_ID === id.Nisit_ID }) !== undefined) return "สถานะการฝึกงาน: " + ReportIntern.map((data) => { return data.F_Status })
        else if (SetDataSelect('อนุมัติ') !== undefined) return "สถานะคำร้องฝึกงาน: อนุมัติ"
        else if (SetDataSelect('ไม่อนุมัติ') !== undefined) return "สถานะคำร้องฝึกงาน: ไม่อนุมัติ"
        else if (SetDataSelect('รอการอนุมัติ') !== undefined) return "สถานะคำร้องฝึกงาน: รอการอนุมัติ"
    }

    const SetDataSelect = (value) => {
        return dataRequest.find((FindData) => { return FindData.Status_re === value })
    }

    return (
        <>
            <div className="homeInternshipContainer">
                <NavbarStudent pageNum="1" />
                <section className="homeInternshipSection">
                    <HeaderStudent />
                    <div className='information'>
                        <h2>ยินดีต้อนรับเข้าสู่ระบบการฝึกงานนิสิต</h2>
                        <h2>{DataSelect()}</h2>
                    </div>
                </section>
            </div>
        </>
    )
}

export default HomeInternship;