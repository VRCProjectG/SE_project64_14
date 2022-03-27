import './style/VaccinePlace.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';

import { useLocation, useNavigate } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function VaccinePlace() {

    const { state } = useLocation();
    const { id } = state;

    const [vacData, setVacdata] = useState([]);

    const navigate = useNavigate();
    const goToAddPage = () => {
        navigate('/Reservation/AddVaccinePlace', { state: { id: id } });
    }

    const goToDeletePage = (IdVac) => {
        navigate('/Reservation/DeleteVaccinePlace', { state: {IdVac: IdVac}});
    }

    const getVacdata = () => {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });
    }

    useEffect(() => {
        getVacdata()
    }, []);

    return (
        <>
            <div className="vaccinePlaceContainer">
                <NavbarStaff pageNum="1" />
                <section className="vaccinePlaceSection">
                    <HeaderStaff />
                    <div className="vaccinePlaceTitle">
                        <h2>ข้อมูลสถานที่จองฉีดวัคซีน</h2>
                        <button className="add" onClick={goToAddPage}>เพิ่มสถานที่การจองวัคซีน</button>
                    </div>
                    <table className="vaccinePlaceTable">
                        <tr>
                            <th>ชื่อสถานที่</th>
                            <th>จำนวน</th>
                            <th>วันเวลา</th>
                            <th></th>
                        </tr>
                        {vacData.map((data) => {
                            return (
                                <tr>
                                    <td>{data.LocationVac}</td>
                                    <td>{data.ValueVac}</td>
                                    <td>{data.DateVac.slice(0,10)}</td>
                                    <td><button className='delete' value={data.IdVac} onClick={(event) => {goToDeletePage(event.target.value)}}>ลบ</button></td>
                                </tr>
                            )
                        }
                        )}
                    </table>
                </section>
            </div>
        </>
    )
}

export default VaccinePlace;