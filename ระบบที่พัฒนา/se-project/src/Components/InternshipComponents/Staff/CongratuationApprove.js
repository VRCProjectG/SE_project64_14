// CSS
import './style/CongratuationApprove.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
import { useState, useEffect } from 'react'
import { useNavigate,useLocation  } from 'react-router-dom';

import moment from 'moment';

import Axios from 'axios'

function CongratuationApprove() {
    const { state } = useLocation();
    const { id } = state

    const [Search, setSearch] = useState("");
    const [Nisit, setNisit] = useState([]);
    const [finalIntern, setfinalIntern] = useState([]);
    const [request, setRequest] = useState([]);

    function getNisit() {
        Axios.get(`http://localhost:3001/nisit`).then((response) => {
            setNisit(response.data);
        });
    }

    function getfinalIntern() {
        Axios.get(`http://localhost:3001/ReportIntern`).then((response) => {
            setfinalIntern(response.data);
        });
    }

    function getNisitSearch(id) {
        Axios.get(`http://localhost:3001/Final_InternSearch/${id}`).then((response) => {
            setNisit(response.data);
        });
    }

    function getRequest() {
        Axios.get(`http://localhost:3001/RequestPetition`).then((response) => {
            setRequest(response.data);
        });
    }

    useEffect(() => {
        getNisit();
        getfinalIntern();
        getRequest();
    }, [])

    const navigate = useNavigate();
    const inspectCongratuation = (value,Id) => {
        navigate('/StaffInternship/InspectCongratuation', { state: { Id: value, DataId : Id } });
    }

    const AddDocument = (value,Id) => {
        navigate('/StaffInternship/AddDocument', { state: { Id: value, DataId : Id } });
    }

    const SearchEvent = (e) => {
        e.preventDefault();
        if(!isNaN(Date.parse(moment(Search, "DD/MM/YYYY").format('YYYY-MM-DD')))){
            getNisitSearch(new Date(moment(Search, "DD/MM/YYYY").format('YYYY-MM-DD')).toJSON().slice(0, 10));
        }
        else if(Search !== ""){
            getNisitSearch(Search)
        }
        else getNisit()
    }

    return (
        <>
            <div className="congratuationApproveContainer">
                <NavbarStaff pageNum="4" />
                <section className="congratuationApproveSection">
                    <HeaderStaff />
                    <div className='title'>
                        <h2>อัปโหลดเอกสารส่งตัวและอนุมัติคำร้องจบการศึกษา</h2>
                        <hr />
                    </div>
                    <div className='search'>
                        <form className='search'>
                            <input type="text" name="search" onChange={(event) => { setSearch(event.target.value) }} />
                            <button onClick={SearchEvent}>ค้นหา</button>
                        </form>
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>ชื่อ นามสกุล</th>
                                <th>วันที่อัพโหลด/ส่งเอกสาร</th>
                                <th>สถานะ</th>
                                <th>หมายเหตุ</th>
                            </tr>
                            {Nisit.map((data) => {
                                const getfinalInternfinddata = finalIntern.find((finddata) => { return finddata.nisit_ID === data.Nisit_ID })
                                const getrequestfinddata = request.find((finddata) => { return finddata.Name === data.Nisit_ID && finddata.Status_re === "อนุมัติ" })

                                if (getrequestfinddata !== undefined && getfinalInternfinddata === undefined) {
                                    return (
                                        <tr>
                                            <td>{data.NAME}</td>
                                            <td>-</td>
                                            <td>ยังไม่ได้อัปโหลดเอกสาร</td>
                                            <td></td>
                                            <td><div className='inspectButton' onClick={() => { AddDocument(data,id) }}>เพิ่มเอกสาร</div></td>
                                        </tr>
                                    )
                                }
                            })}

                            {Nisit.map((data) => {
                                const getfinalInternfinddata = finalIntern.find((finddata) => { return finddata.nisit_ID === data.Nisit_ID })
                                const getrequestfinddata = request.find((finddata) => { return finddata.Name === data.Nisit_ID && finddata.Status_re === "อนุมัติ" })
                                if (getrequestfinddata !== undefined && getfinalInternfinddata !== undefined) {
                                    if (getfinalInternfinddata.F_Status === "รอการตรวจสอบ") {
                                        return (
                                            <tr>
                                                <td>{data.NAME}</td>
                                                <td>{moment(getfinalInternfinddata.Date_Report).format('DD-MM-YYYY')}</td>
                                                <td>{getfinalInternfinddata.F_Status}</td>
                                                <td>{getfinalInternfinddata.F_Descrip}</td>
                                                <td><div className='inspectButton' onClick={() => { inspectCongratuation(data,id) }}>ตรวจสอบ</div></td>
                                            </tr>
                                        )
                                    }
                                    else {
                                        return (

                                            <tr>
                                                <td>{data.NAME}</td>
                                                <td>{moment(getfinalInternfinddata.Date_Report).format('DD-MM-YYYY')}</td>
                                                <td>{getfinalInternfinddata.F_Status}</td>
                                                <td>{getfinalInternfinddata.F_Descrip}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    }
                                }
                            })}
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CongratuationApprove;