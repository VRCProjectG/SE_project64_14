// CSS
import './style/PetitionValidation.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import moment from 'moment';

import Axios from 'axios'

function PetitionValidation() {
    const { state } = useLocation();
    const { id } = state

    console.log(id);

    const navigate = useNavigate();
    const [request, setRequest] = useState([]);

    const [Nisit, setNisit] = useState([]);

    function getRequest() {
        Axios.get(`http://localhost:3001/RequestPetitionStaff`).then((response) => {
            setRequest(response.data);
        });
    }

    function getNisit() {
        Axios.get(`http://localhost:3001/nisit`).then((response) => {
            setNisit(response.data);
        });
    }

    useEffect(() => {  
        getNisit()
        getRequest();
    }, [])

    const inspectPetitionPage = (data,Id) => {
            navigate('/StaffInternship/InspectPetition',{ state: { Id: data,Data:Id} });
    }

    return (
        <>
            <div className="petitionValidationContainer">
                <NavbarStaff pageNum="2" />
                <section className="petitionValidationSection">
                    <HeaderStaff />
                    <div className='title'>
                        <h2>ตรวจสอบผลการอนุมัติ</h2>
                        <hr />
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>ชื่อ นามสกุล</th>
                                <th>บริษัทที่สมัคร</th>
                                <th>ประเภท</th>
                                <th>วันที่ส่งเอกสาร</th>
                            </tr>
                            {request.map((data) => {
                                return (
                                    <tr>
                                        <td>{Nisit.find((finddata) =>{ return finddata.Nisit_ID === data.Name}).NAME}</td>
                                        <td>{data.LocationShip_ID}</td>
                                        <td>{data.InternType}</td>
                                        <td>{moment(data.Date_Re).format('DD-MM-YYYY')}</td>
                                        <td><div className='inspectButton' onClick={() => { inspectPetitionPage(data,id) }}>ตรวจสอบ</div></td>
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

export default PetitionValidation;