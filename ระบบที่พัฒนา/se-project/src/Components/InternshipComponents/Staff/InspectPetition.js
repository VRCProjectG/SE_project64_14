// CSS
import "./style/InspectPetition.css";
// Utills
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import moment from 'moment';

import Axios from "axios";

function InspectPetition() {
    const { state } = useLocation();
    const { Id,Data } = state;
    const navigate = useNavigate();

    const [Status, setStatus] = useState([]);

    const [Nisit, setNisit] = useState([]);
    const [Admin, setAdmin] = useState([]);

    function getNisit(Id) {
        Axios.get(`http://localhost:3001/nisitId/${Id}`).then((response) => {
            setNisit(response.data);
        });
    }

    function getAdmin(Id) {
        Axios.get(`http://localhost:3001/admin/${Id}`).then((response) => {
            setAdmin(response.data);
        });
    }

    useEffect(() => {
        getNisit(Id.Name)
        getAdmin(Data.Admin_ID)
    }, [])

    const updateData = (ID_Re) => {
        Axios.put("http://localhost:3001/status/update", {
            Status_re: "อนุมัติ",
            Descript: "",
            ID_Re: ID_Re
        }).then((response) => {
            setStatus(
                Status.map((val) => {
                    return val.ID_Re == ID_Re ? {
                        ID_Re: val.ID_Re,
                        Status_re: "อนุมัติ",
                        Descript: "",
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

    const disapprovedPage = () => {
        navigate('/StaffInternship/DisaprovedPetition',{ state: { Id: Id,Data:Data} })
    }
    const previousPage = () => {
        navigate('/StaffInternship/PetitionValidation',{state:{id: Data}});
    }

    return (
        <>
            <div className="inspectPetitionSection">

                <div className="information">
                    <div className="form">
                        <form>
                            <div className="back" onClick={previousPage}>&#8592;</div>
                            <div className="title">
                                <h2>ออกคำร้องขอการฝึกงาน</h2>
                                <div className="radio">
                                    <div>
                                        <input type="radio" name="intershipRadio" checked={Id.InternType === "ฝึกงาน"}/>
                                        <div>ฝึกงาน</div>
                                    </div>
                                    <div>
                                        <input type="radio" name="intershipRadio" checked={Id.InternType === "สหกิจ"}/>
                                        <div>สหกิจศึกษา</div>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="input">
                                <div className="leftContainer">
                                    <div className="row1">
                                        <label>ชื่อ-นามสกุล</label>
                                        <div className="nameSurname">
                                            <input type="text" name="nameSurname"
                                                value={Nisit.map((data) => { return data.NAME })} />
                                        </div>
                                    </div>
                                    <div className="row2">
                                        <label>วันที่เขียนคำร้อง</label>
                                        <div className="date">
                                            <input type="date" name="date"
                                                value={moment(Id.Date_Re).format('YYYY-MM-DD')} />
                                        </div>
                                    </div>
                                    <div className="row3">
                                        <label>เบอร์โทรศัพท์มือถือ</label>
                                        <div className="tel">
                                            <input type="text" name="tel"
                                                value={Id.Phone} />
                                        </div>
                                    </div>
                                    <div className="row4">
                                        <label>Facebook</label>
                                        <div className="facebook">
                                            <input type="text" name="facebook"
                                                value={Id.Facebook} />
                                        </div>
                                    </div>
                                    <div className="row5">
                                        <label>สถานที่ฝึก</label>
                                        <div className="place">
                                            <input type="text" name="place"
                                                value={Id.LocationShip_ID} />
                                        </div>
                                    </div>
                                    <div className="row6">
                                        <label>ตำแหน่งที่ฝึก</label>
                                        <div className="position">
                                            <input type="text" name="position"
                                                value={Id.Position_ID} />
                                        </div>
                                    </div>
                                    <div className="row7">
                                        <label>ที่อยู่สถานที่ฝึก</label>
                                        <div className="placeLocation">
                                            <input type="text" name="placeLocation"
                                                value={Id.Location_ID} />
                                        </div>
                                    </div>
                                </div>
                                <div className="rightContainer">
                                    <div className="row1">
                                        <label>ชื่อของผู้ที่จะให้ภาควิชาออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ</label>
                                        <div className="nameApprove">
                                            <input type="text" name="nameApprove"
                                                value={Id.Name_LoShip} />
                                        </div>
                                    </div>
                                    <div className="row2">
                                        <label>ตำแหน่งของผู้ที่จะให้ภาควิชาออกหนังสือขอความอนุเคราะห์ฝึกงาน</label>
                                        <div className="positionApprove">
                                            <input type="text" name="positionApprove"
                                                value={Id.Posittion_LoShip} />
                                        </div>
                                    </div>
                                    <div className="row3">
                                        <label>ชื่อผู้ประสานงาน</label>
                                        <div className="nameCordinate">
                                            <input type="text" name="tel"
                                                value={Id.Collaborator_Name} />
                                        </div>
                                    </div>
                                    <div className="row4">
                                        <label>โทร</label>
                                        <div className="telCordinate">
                                            <input type="text" name="telCordinate"
                                                value={Id.Phone_Collab} />
                                        </div>
                                    </div>
                                    <div className="row5">
                                        <label>อีเมล</label>
                                        <div className="email">
                                            <input type="text" name="email"
                                                value={Id.Email_Collab} />
                                        </div>
                                    </div>
                                    <div className="row6">
                                        <label>ระยะฝึกงาน</label>
                                        <div className="timeline">
                                            <input type="date" name="startTime"
                                                value={moment(Id.Date_Start).format('YYYY-MM-DD')} />
                                            <div>ถึง</div>
                                            <input type="date" name="endTime"
                                                value={moment(Id.Date_End).format('YYYY-MM-DD')} />
                                        </div>
                                    </div>
                                    <div className="row7">
                                        <label>แนบไฟล์คำร้องขอฝึกงาน/สหกิจศึกษา</label>
                                        <div className="file">
                                            <div ><a href={Id.Add_File}>คลิกเพื่อดู</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {Admin.map((data) => { if(data.A_Posittion === 'อาจารย์')  { return (
                                
                                <div className="button">
                                    <button className="approved"onClick={submitForm}>อนุมัติ</button>
                                    <button className="disapproved" onClick={disapprovedPage}>ไม่อนุมัติ</button>
                                </div>
                            )}})}
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InspectPetition;