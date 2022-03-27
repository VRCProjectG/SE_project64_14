// CSS
import './style/StatusCheck.css';
// Components
import NavbarCitizen from './ReuseComponents/NavbarCitizen';
import HeaderCitizen from './ReuseComponents/HeaderCitizen';

import { useLocation } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function StatusCheck(){
    
    const {state} = useLocation();
    const {id} = state;

    const [Status , setStatus] = useState([]);
    const [vacData, setVacdata] = useState([]);
    
    const getStatus = (id) => {
        Axios.get(`http://localhost:3001/status/${id}`).then((response) => {
            setStatus(response.data);
        });
    };

    useEffect(() => {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });
    }, []);

    useEffect(() => {
        getStatus(id.IdUser)
    }, []);

    const GetStatusVacdata = (value) => 
    {
        return vacData.find((data) => {return data.IdVac == value})
    }

    const StatusName = (value) =>
    {
        if(value == 0) return "กำลังตรวจสอบ"
        return "ผ่าน"
    }

    return(
        <>
            <div className="statusCheckContainer">
                <NavbarCitizen pageNum="1"/>
                <section className="statusCheckSection">
                    <HeaderCitizen/>
                    <table className="statusCheckTable">
                        <tr>
                            <th>ชื่อสถานที่</th>
                            <th>วันเวลา</th>
                            <th>สถานะ</th>
                        </tr>
                        <tr>
                            {Status.map((data) => { 
                                return <td>{GetStatusVacdata(data.VacReserve).LocationVac}</td> 
                            })}
                            {Status.map((data) => { 
                                return <td>{GetStatusVacdata(data.VacReserve).DateVac.slice(0, 10)}</td> 
                            })}
                            {Status.map((data) => { 
                                return <td>{StatusName(data.StatusVac)}</td> 
                            })}
                        </tr>
                    </table>
                </section>
            </div>
        </>
    )
}

export default StatusCheck;