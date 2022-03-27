// CSS
import './style/CompanyEdit.css';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react'

import Axios from 'axios'

function CompanyEdit() {

    const { state } = useLocation();
    const { Id } = state

    const navigate = useNavigate();

    const [newName, setnewName] = useState(Id.Name);
    const [newJobTitle, setnewJobTitle] = useState(Id.JobTitle);
    const [newAmount, setnewAmount] = useState(Id.Amount);
    const [newJobDescrip, setnewJobDescrip] = useState(Id.JobDescrip);

    const [Locationlist, setLocationlist] = useState([]);

    const updateData = (Id) => {
        Axios.put("http://localhost:3001/LocationInternship/update", {
            Name: newName,
            JobTitle: newJobTitle,
            Amount: newAmount,
            JobDescrip: newJobDescrip,
            Id: Id
        }).then((response) => {
            setLocationlist(
                Locationlist.map((val) => {
                    return val.Id == Id ? {
                        Id: val.Id,
                        Name: newName,
                        JobTitle: newJobTitle,
                        Amount: newAmount,
                        JobDescrip: newJobDescrip,
                    } : val;
                })
            )
        })
    }

    const submitEditForm = (e) => {
        e.preventDefault();
        updateData(Id.Id);
        navigate(-1);
    }

    const previousPage = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="companyEditContainer">
                <div className='companyEditSection'>
                    <div className='title'>
                        <h2>แก้ไขสถานประกอบการ</h2>
                        <hr />
                    </div>
                    <form className='editForm' onSubmit={submitEditForm}>
                        <div className="row1">
                            <label>ชื่อ</label>
                            <div className="name">
                                <input type="text" name="name"
                                    value={Id.Name}
                                    onChange={(event) => {
                                        setnewName(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row2">
                            <label>ตำแหน่ง</label>
                            <div className="position">
                                <input type="text" name="position"
                                    Value={Id.JobTitle}
                                    onChange={(event) => {
                                        setnewJobTitle(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row3">
                            <label>จำนวน</label>
                            <div className="quantity">
                                <input type="text" name="quantity"
                                    Value={Id.Amount}
                                    onChange={(event) => {
                                        setnewAmount(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row4">
                            <label>ลักษณะงาน</label>
                            <div className="detail">
                                <input type="text" name="detail"
                                    Value={Id.JobDescrip}
                                    onChange={(event) => {
                                        setnewJobDescrip(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className='button'>
                            <button type='submit'>แก้ไข</button>
                        </div>
                    </form>
                    <button onClick={previousPage}>ยกเลิก</button>
                </div>
            </div>
        </>
    )
}

export default CompanyEdit;