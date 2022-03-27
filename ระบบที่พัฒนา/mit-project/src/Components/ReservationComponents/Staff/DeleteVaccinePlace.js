// CSS
import './style/DeleteVaccinePlace.css'
// Utils
import { useLocation, useNavigate } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function DeleteVaccinePlace() {

    const { state } = useLocation();
    const { IdVac } = state;
    
    const [vacData, setVacdata] = useState([]);

    const navigate = useNavigate();
    const goBackToPreviousPage = () => {
        navigate(-1);
    }

    const submitForm = (e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/delete/Location/${IdVac}`).then((response) => {
            setVacdata(
                vacData.filter((val) => {
                    return val.IdVac !== IdVac;
                })
            )
            navigate(-1);
        })
    }

    return (
        <>
            <div className="deleteVaccinePlaceContainer">
                <div className="deleteVaccinePlaceForm">
                    <h2 className="headTitle">คุณต้องการจะลบข้อมูลสถานที่</h2>
                    <h2>นี้หรือไม่</h2>
                    <form onSubmit={submitForm}>
                        <div className="buttonForm">
                            <button className="submit" type="submit" >ลบ</button>
                            <button className="back" onClick={goBackToPreviousPage}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeleteVaccinePlace;