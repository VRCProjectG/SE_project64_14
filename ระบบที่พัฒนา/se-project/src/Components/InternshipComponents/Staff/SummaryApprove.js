// CSS
import './style/SummaryApprove.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
import { useState, useEffect } from 'react'

import moment from 'moment';

import Axios from 'axios'

function SummaryApprove() {

    const [Search, setSearch] = useState("");
    const [request, setRequest] = useState([]);
    const [Nisit, setNisit] = useState([]);

    function getRequest() {
        Axios.get(`http://localhost:3001/RequestPetition`).then((response) => {
            setRequest(response.data);
        });
    }

    function getRequestSearch(id) {
        Axios.get(`http://localhost:3001/RequestSearch/${id}`).then((response) => {
            setRequest(response.data);
        });
    }

    function getNisit() {
        Axios.get(`http://localhost:3001/nisit`).then((response) => {
            setNisit(response.data);
        });
    }

    useEffect(() => {
        getNisit();
        getRequest();
    }, [])

    const SecrchEvent = (e) => {
        e.preventDefault();
        if (!isNaN(Date.parse(moment(Search, "DD/MM/YYYY").format('YYYY-MM-DD')))) {
            getRequestSearch(new Date(moment(Search, "DD/MM/YYYY").format('YYYY-MM-DD')).toJSON().slice(0, 10));
        }
        else if (Search !== "") {
            getRequestSearch(Search)
        }
        else getRequest()
    }

    return (
        <>
            <div className="summaryApproveContainer">
                <NavbarStaff pageNum="3" />
                <section className="summaryApproveSection">
                    <HeaderStaff />
                    <div className='title'>
                        <h2>คำร้องฝึกงาน</h2>
                        <hr />
                    </div>
                    <div className='search'>
                        <form className='search'>
                            <input type="text" name="search" onChange={(event) => { setSearch(event.target.value) }} />
                            <button onClick={SecrchEvent}>ค้นหา</button>
                        </form>
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>ชื่อ นามสกุล</th>
                                <th>บริษัท</th>
                                <th>วันที่ส่งเอกสาร</th>
                                <th>ประเภท</th>
                                <th>สถานะ</th>
                            </tr>
                            {request.map((data) => {
                                return (
                                    <tr>
                                        <td>{Nisit.find((finddata) => { return finddata.Nisit_ID === data.Name }).NAME}</td>
                                        <td>{data.LocationShip_ID}</td>
                                        <td>{moment(data.Date_Re).format('DD-MM-YYYY')}</td>
                                        <td>{data.InternType}</td>
                                        <td>{data.Status_re}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SummaryApprove;