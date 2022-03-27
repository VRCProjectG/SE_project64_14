// CSS
import './style/VaccineReservation.css';
// Components
import NavbarCitizen from './ReuseComponents/NavbarCitizen';
import HeaderCitizen from './ReuseComponents/HeaderCitizen';

import { useLocation,useNavigate } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function VaccineReservation() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id } = state;

    const [userVacId, setuserVacId] = useState(id.IdUser);
    const [locaVacId, setlocaVacId] = useState(0);
    const [dataListVac, setDataListVac] = useState([]);

    const [vacData, setVacdata] = useState([]);

    const [vacDate, setDate] = useState();

    function getVacPlace() {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });
    }

    const addData = () => {
        Axios.post("http://localhost:3001/user/ReserVac", {
            userVacId: userVacId,
            locaVacId: locaVacId,
        }).then(() => {
            setDataListVac([
                ...dataListVac,
                {
                    userVacId: userVacId,
                    locaVacId: locaVacId,
                },
            ]);
        });
    };

    useEffect(() => {
        getVacPlace()
    }, []);

    const submitRegisterForm = (e) => 
    {
        e.preventDefault();
        addData();
        navigate('/Reservation/StatusCheck',{ state: {id: id}});
    }

    const setOnDate = (value) => {
        setDate(vacData.find((vacPlace) => { return vacPlace.IdVac == value }).DateVac.slice(0, 10))
        setlocaVacId(value)
    }

    return (
        <>
            <div className="vaccineReservationContainer">
                <NavbarCitizen pageNum="2" />
                <section className="vaccineReservationkSection">
                    <form onSubmit={submitRegisterForm}>
                        <HeaderCitizen />
                        <br />
                        <div className="LocationVac">
                            <div className="title">สถานที่จองวัคซีน</div>
                            <select name="LocationVac" onChange={(event) => { setOnDate(event.target.value) }} required >
                                <option selected='selected' hidden>----สถานที่ฉีดวัคซีน----</option>
                                {vacData.map((vacPlace) => {
                                    return <option value={vacPlace.IdVac}> {vacPlace.LocationVac} </option>
                                }
                                )}
                            </select>
                        </div>
                        <br />
                        <div className="DateVac">
                            <div className="title">วันเวลาที่ฉีดวัคซีน</div>
                            <input type="text" value={vacDate} />
                        </div>
                        <br />
                        <button className="submit" type="submit" >ยืนยัน</button>
                    </form>
                </section>
            </div>
        </>
    )
}

export default VaccineReservation;