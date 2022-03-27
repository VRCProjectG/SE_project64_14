// CSS
import './style/ReservationCheck.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';

import { useLocation, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react'

import Axios from 'axios'

function ReservationCheck() {

    const { state } = useLocation();
    const { id } = state;

    const navigate = useNavigate();

    const [vacData, setVacdata] = useState([]);
    const [User, setUser] = useState([]);
    const [Status, setStatus] = useState([]);

    const [StatusUpdate, setStatusUpdate] = useState([]);

    const AxiosAll = () => {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });

        Axios.get(`http://localhost:3001/user`).then((response) => {
            setUser(response.data);
        });

        Axios.get(`http://localhost:3001/status`).then((response) => {
            setStatus(response.data);
        });
    }

    useEffect(() => {
        AxiosAll();
    }, []);

    const FindUser = (value) => {
        return User.find((data) => { return data.IdUser == value })
    }

    const FindLocation = (value) => {
        return vacData.find((data) => { return data.IdVac == value })
    }

    const UpdateStatus = (IdReserve) => {
        Axios.put("http://localhost:3001/status/update", {
            IdReserve: IdReserve,
            StatusVac: 1
        }).then((response) => {
            setStatusUpdate(
                StatusUpdate.map((val) => {
                    return val.IdReserve == IdReserve ? {
                        IdReserve: val.IdReserve,
                        StatusVac: 1,
                    } : val;
                })
            )
            navigate(-1)
            navigate(+1)
        })
    }

    const DeleteStatus = (IdReserve) => {
        Axios.delete(`http://localhost:3001/delete/${IdReserve}`).then((response) => {
            setStatusUpdate(
                StatusUpdate.filter((val) => {
                    return val.IdReserve !== IdReserve;
                })
            )
            navigate(-1)
            navigate(+1)
        })
    }

    return (
        <>
            <div className="reservationCheckContainer">
                <NavbarStaff pageNum="2" />
                <section className="reservationCheckSection">
                    <HeaderStaff />
                    <table className="reservationCheckTable">
                        <tr>
                            <th>ชื่อ-นามสกุล</th>
                            <th>บัตรประชาชน 13 หลัก</th>
                            <th>วันเวลาจองวัคซีน</th>
                            <th></th>
                            <th></th>
                        </tr>

                        {Status.map((data) => {
                            if (data.StatusVac == 0) {
                                return (
                                    <tr>
                                        <td>{FindUser(data.UserReserve).NameSurname}</td>
                                        <td>{FindUser(data.UserReserve).IdCard}</td>
                                        <td>{FindLocation(data.VacReserve).DateVac.slice(0, 10)}</td>

                                        <td><button className='approve' onClick={() => { UpdateStatus(data.IdReserve) }}>อนุมัติ</button></td>
                                        <td><button className='refuse' onClick={() => { DeleteStatus(data.IdReserve) }}>ปฏิเสธ</button></td>
                                    </tr>
                                )
                            }
                        })}
                    </table>
                </section>
            </div>
        </>
    )
}

export default ReservationCheck;