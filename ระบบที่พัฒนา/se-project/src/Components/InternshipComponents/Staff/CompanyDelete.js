// CSS
import './style/CompanyDelete.css';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react'

import Axios from 'axios'

function CompanyDelete() {

    const { state } = useLocation();
    const { Id } = state

    const [Location, setLocation] = useState([]);
    const [Locationlist, setLocationlist] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:3001/LocationInternship/${Id}`).then((response) => {
            setLocationlist(response.data);
        });
    }, [])

    const submitDeleteForm = (e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/delete/${Id}`).then((response) => {
            setLocation(
                Location.filter((val) => {
                    return val.Id !== Id;
                })
            )
            navigate(-1);
        })
    }

    const previousPage = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="companyDeleteContainer">
                <div className='companyDeleteSection'>

                    <div className='title'>
                        <h2>คุณต้องการจะลบสถานประกอบการ "<span>{Locationlist.map((data) => { return (data.Name) })}</span>" ใช่หรือไม่</h2>
                        <hr />
                    </div>
                    <form className='deleteForm' onSubmit={submitDeleteForm}>
                        <div className='button'>
                            <button type='submit'>ลบ</button>
                        </div>
                    </form>
                    <button onClick={previousPage}>ยกเลิก</button>
                </div>
            </div>
        </>
    )
}

export default CompanyDelete;