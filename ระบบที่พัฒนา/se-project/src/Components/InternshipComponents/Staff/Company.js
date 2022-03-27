// CSS
import './style/Company.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
import { useState, useEffect } from 'react'
// Utils
import { useNavigate } from 'react-router-dom';

import Axios from 'axios'

function Company() {
    const navigate = useNavigate();

    const [Search, setSearch] = useState("");
    const [Location, setLocation] = useState([]);

    function getLocation() {
        Axios.get(`http://localhost:3001/LocationInternship`).then((response) => {
            setLocation(response.data);
        });
    }

    function getLocationSearch(id) {
        Axios.get(`http://localhost:3001/LocationInternshipSearch/${id}`).then((response) => {
            setLocation(response.data);
        });
    }

    useEffect(() => {
        getLocation();
    }, [])

    const addPage = () => {
        navigate('/StaffInternship/CompanyAdd')
    }
    const editPage = (Id) => {
        navigate('/StaffInternship/CompanyEdit', { state: { Id: Id } })
    }
    const deletePage = (Id) => {
        navigate('/StaffInternship/CompanyDelete', { state: { Id: Id } });
    }

    const SecrchEvent = (e) => {
        e.preventDefault();
        if (Search !== "") getLocationSearch(Search);
        else getLocation()
    }

    return (
        <>
            <div className="companyContainer">
                <NavbarStaff pageNum="1" />
                <section className="companySection">
                    <HeaderStaff />
                    <div className='title'>
                        <h2>สถานประกอบการ</h2>
                        <hr />
                    </div>
                    <div className='searchAndAdd'>
                        <form className='search'>
                            <input type="text" name="search" onChange={(event) => { setSearch(event.target.value) }} />
                            <button onClick={SecrchEvent}>ค้นหา</button>
                        </form>
                        <div className='add' onClick={addPage}>เพิ่ม</div>
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>ชื่อ</th>
                                <th>ตำแหน่ง</th>
                                <th>จำนวน</th>
                                <th>ลักษณะงาน</th>
                            </tr>
                            {Location.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.Name}</td>
                                        <td>{data.JobTitle}</td>
                                        <td>{data.Amount}</td>
                                        <td>{data.JobDescrip}</td>
                                        <td><div className='edit' onClick={() => { editPage(data) }}>แก้ไข</div></td>
                                        <td><button className='delete' value={data.Id} onClick={(event) => { deletePage(event.target.value) }}>ลบ</button></td>
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

export default Company;