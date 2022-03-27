// CSS
import "./style/DisaprovedPetition.css";
// Utills
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Axios from "axios";

function DisaprovedPetition() {
    const { state } = useLocation();
    const { Id,Data } = state;

    const [Status, setStatus] = useState([]);
    const [Nisit, setNisit] = useState([]);

    const [Descript, setnewDescript] = useState("");

    const navigate = useNavigate();
    const previousPage = () => {
        navigate('/StaffInternship/InspectPetition', { state: { Id: Id, Data : Data }})
    }

    function getNisit(Id) {
        Axios.get(`http://localhost:3001/nisitId/${Id}`).then((response) => {
            setNisit(response.data);
        });
    }

    useEffect(() => {
        getNisit(Id.Name)
    }, [])

    const updateData = (ID_Re) => {
        Axios.put("http://localhost:3001/status/update", {
            Status_re: "ไม่อนุมัติ",
            Descript: Descript,
            ID_Re: ID_Re
        }).then((response) => {
            setStatus(
                Status.map((val) => {
                    return val.ID_Re == ID_Re ? {
                        ID_Re: val.ID_Re,
                        Status_re: "ไม่อนุมัติ",
                        Descript: Descript,
                    } : val;
                })
            )
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        updateData(Id.ID_Re);
        navigate('/StaffInternship/PetitionValidation',{state:{id: Data}});
    }

    return (
        <>
            <div className="disaprovedPetitionSection">

                <div className="information">
                    <div className="form">
                        <form>
                            <div className="title">
                                <h2>เหตุผลที่ไม่พิจารณาอนุมัติของ <span>{Nisit.map((data) => { return data.NAME })}</span></h2>
                            </div>

                            <hr />

                            <div className="input">
                                <div className="container">
                                    <div className="row1">
                                        <div className="reason">
                                            <input type="text" name="reason" placeholder="กรอกเหตุผลที่ไม่อนุมัติ"
                                                onChange={(event) => {
                                                    setnewDescript(event.target.value)
                                                }} required />
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

export default DisaprovedPetition;