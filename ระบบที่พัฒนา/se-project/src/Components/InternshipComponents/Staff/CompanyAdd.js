// CSS
import './style/CompanyAdd.css';
// Utils
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

import Axios from "axios";

function CompanyAdd() {
    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [JobTitle, setJobTitle] = useState("");
    const [Amount, setAmount] = useState("");
    const [JobDescrip, setJobDescrip] = useState("");

    const [Locationlist, setLocationlist] = useState([]);

    const submitAddForm = (e) => {
        e.preventDefault();
        addData();
        navigate(-1);
    }
    const previousPage = () => {
        navigate(-1);
    }

    const addData = () => {
        Axios.post("http://localhost:3001/LocationInternship/add", {
            Name: Name,
            JobTitle: JobTitle,
            Amount: Amount,
            JobDescrip: JobDescrip,
        }).then(() => {
            setLocationlist([
                ...Locationlist,
                {
                    Name: Name,
                    JobTitle: JobTitle,
                    Amount: Amount,
                    JobDescrip: JobDescrip,
                },
            ]);
        });
    };

    return (
        <>
            <div className="companyAddContainer">
                <div className='companyAddSection'>
                    <div className='title'>
                        <h2>เพิ่มสถานประกอบการ</h2>
                        <hr />
                    </div>
                    <form className='addForm' onSubmit={submitAddForm}>
                        <div className="row1">
                            <label>ชื่อ</label>
                            <div className="name">
                                <input type="text" name="name"
                                    onChange={(event) => {
                                        setName(event.target.value)
                                    }} required/>
                            </div>
                        </div>
                        <div className="row2">
                            <label>ตำแหน่ง</label>
                            <div className="position">
                                <input type="text" name="position"
                                    onChange={(event) => {
                                        setJobTitle(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row3">
                            <label>จำนวน</label>
                            <div className="quantity">
                                <input type="text" name="quantity"
                                    onChange={(event) => {
                                        setAmount(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row4">
                            <label>ลักษณะงาน</label>
                            <div className="detail">
                                <input type="text" name="detail"
                                    onChange={(event) => {
                                        setJobDescrip(event.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className='button'>
                            <button type='submit'>เพิ่ม</button>
                        </div>
                    </form>
                    <button onClick={previousPage}>ยกเลิก</button>
                </div>
            </div>
        </>
    )
}

export default CompanyAdd;