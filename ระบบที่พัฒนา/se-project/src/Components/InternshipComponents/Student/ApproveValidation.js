// CSS
import './style/ApproveValidation.css';
// Components
import NavbarStudent from './ReuseComponents/NavbarStudent';
import HeaderStudent from './ReuseComponents/HeaderStudent';

import moment from 'moment';

import { useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react'

import Axios from 'axios'

function ApproveValidation() {
    const {state} = useLocation();
    const {id} = state

    const [RequestPetition, setRequestPetition] = useState([]);

    function getRequestPetition(Id) {
        Axios.get(`http://localhost:3001/RequestPetition/${Id}`).then((response) => {
            setRequestPetition(response.data);
        });
    }

    useEffect(() => {
        getRequestPetition(id.Nisit_ID)
    }, [])

    return (
        <>
            <div className="approveValidationContainer">
                <NavbarStudent pageNum="3" />
                <section className="approveValidationSection">
                    <HeaderStudent />
                    <div className='title'>
                        <h2>ตรวจสอบผลการอนุมัติ</h2>
                        <hr />
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>วันที่ส่งคำร้อง</th>
                                <th>สถานประกอบการ</th>
                                <th>สถานะ</th>
                                <th>หมายเหตุ</th>
                            </tr>
                            {RequestPetition.map((data) => {
                                return (
                                    <tr>
                                        <td>{moment(data.Date_Re).format('DD-MM-YYYY')}</td>
                                        <td>{data.LocationShip_ID}</td>
                                        <td>{data.Status_re}</td>
                                        <td>{data.Descript}</td>
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

export default ApproveValidation;