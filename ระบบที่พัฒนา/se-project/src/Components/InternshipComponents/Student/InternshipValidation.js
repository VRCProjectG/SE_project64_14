// CSS
import './style/InternshipValidation.css';
// Components
import NavbarStudent from './ReuseComponents/NavbarStudent';
import HeaderStudent from './ReuseComponents/HeaderStudent';

import moment from 'moment';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

import Axios from 'axios'

function InternshipValidation() {

    const { state } = useLocation();
    const { id } = state

    const [ReportIntern, setReportIntern] = useState([]);

    function getReportIntern(nisit_ID) {
        Axios.get(`http://localhost:3001/ReportIntern/${nisit_ID}`).then((response) => {
            setReportIntern(response.data);
        });
    }

    useEffect(() => {
        getReportIntern(id.Nisit_ID)
    }, [])

    return (
        <>
            <div className="internshipValidationContainer">
                <NavbarStudent pageNum="5" />
                <section className="internshipValidationSection">
                    <HeaderStudent />
                    <div className='title'>
                        <h2>ตรวจสอบผลการฝึกงาน</h2>
                        <hr />
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>วันที่อัปเดต</th>
                                <th>สถานะ</th>
                                <th>หมายเหตุ</th>
                            </tr>
                            {ReportIntern.map((data) => {
                                return (
                                    <tr>
                                        <td>{moment(data.Date_Report).format('DD-MM-YYYY')}</td>
                                        <td>{data.F_Status}</td>
                                        <td>{data.F_Descrip}</td>
                                    </tr>
                                )
                            }
                            )}
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default InternshipValidation;