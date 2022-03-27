// CSS
import "./style/DisapprovedCongratuation.css";
// Utills
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Axios from "axios";

function DisapprovedCongratuation() {

    const { state } = useLocation();
    const { Id,DataId } = state;
    
    console.log(DataId)

    const [Status, setStatus] = useState([]);

    const [F_Descrip, setF_Descrip] = useState("");

    const navigate = useNavigate();
    const previousPage = () => {
        navigate('/StaffInternship/InspectCongratuation', { state: { Id: Id, DataId : DataId }})
    }

    const updateData = (nisit_ID) => {
        Axios.put("http://localhost:3001/status/update/congrat", {
            F_Status: "ไม่ผ่าน",
            nisit_ID: nisit_ID,
            F_Descrip: F_Descrip,
        }).then((response) => {
            setStatus(
                Status.map((val) => {
                    return val.nisit_ID == nisit_ID ? {
                        nisit_ID: val.nisit_ID,
                        F_Status: "ไม่ผ่าน",
                        F_Descrip: F_Descrip,
                    } : val;
                })
            )
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        updateData(Id.Nisit_ID);
        console.log(DataId)
        navigate('/StaffInternship/CongratuationApprove',{state: {id: DataId}});
    }

    return (
        <>
            <div className="disapprovedCongratuationSection">

                <div className="information">
                    <div className="form">
                        <form>
                            <div className="title">
                                <h2>เหตุผลที่ไม่พิจารณาอนุมัติจบการศึกษาของ <span>{Id.NAME}</span></h2>
                            </div>

                            <hr />

                            <div className="input">
                                <div className="container">
                                    <div className="row1">
                                        <div className="reason">
                                            <input type="text" name="reason" placeholder="กรอกเหตุผลที่ไม่อนุมัติ"
                                                onChange={(event) => {
                                                    setF_Descrip(event.target.value)
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button">
                                <button className="disapproved" type="submit" onClick={submitForm} >ไม่อนุมัติ</button>
                                <button className="back" onClick={previousPage}>ย้อนกลับ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DisapprovedCongratuation;