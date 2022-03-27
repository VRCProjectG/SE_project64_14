// CSS
import './style/ReportInternship.css';
// Components
import NavbarStudent from './ReuseComponents/NavbarStudent';
import HeaderStudent from './ReuseComponents/HeaderStudent';

import moment from 'moment';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'

import Axios from 'axios'

function ReportInternship() {
    const { state } = useLocation();
    const { id } = state

    const navigate = useNavigate();

    const [ReportIntern, setReportIntern] = useState([]);

    const [Status, setStatus] = useState([]);

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [file2, setFile2] = useState();
    const [fileName2, setFileName2] = useState();

    const [nisit_ID] = useState(id.Nisit_ID);

    function getReportIntern(nisit_ID) {
        Axios.get(`http://localhost:3001/ReportIntern/${nisit_ID}`).then((response) => {
            setReportIntern(response.data);
        });
    }

    useEffect(() => {
        getReportIntern(id.Nisit_ID)
    }, [])

    const addData = (e) => {
        e.preventDefault();


        if (file !== undefined && file2 !== undefined) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", fileName);
            Axios.post("http://localhost:3001/uploadfile", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            const formData2 = new FormData();
            formData2.append("file", file2);
            formData2.append("fileName", fileName2);
            Axios.post("http://localhost:3001/uploadfile", formData2, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            Axios.put("http://localhost:3001/status/update/upfile", {
                Up_Report: fileName,
                Up_Report2: fileName2,
                Date_Report: new Date().toJSON().slice(0, 10),
                F_Status: "รอการตรวจสอบ",
                F_Descrip: "",
                nisit_ID: nisit_ID
            }).then((response) => {
                setStatus(
                    Status.map((val) => {
                        return val.nisit_ID == nisit_ID ? {
                            nisit_ID: val.nisit_ID,
                            Up_Report: fileName,
                            Up_Report2: fileName2,
                            Date_Report: new Date().toJSON().slice(0, 10),
                            F_Status: "รอการตรวจสอบ",
                            F_Descrip: "",
                        } : val;
                    })
                )
            })
            navigate('/StudentInternship/HomeInternship', { state: { id: id } })
        }
        else alert("กรุณาใส่ไฟล์ให้ครบ")
    };

    const AddFileEvent = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const AddFileEvent2 = (event) => {
        setFile2(event.target.files[0]);
        setFileName2(event.target.files[0].name);
    }

    return (
        <>
            <div className="reportInternshipContainer">
                <NavbarStudent pageNum="4" />
                <section className="reportInternshipSection">
                    <HeaderStudent />
                    <div className='information'>
                        <div className='download'>
                            <h2>ดาวน์โหลดเอกสาร</h2>
                            {ReportIntern.map((data) => {
                                return (
                                    <div className='button'>
                                        <div className='permissionBook'><a href={data.Assist_Form}>หนังสือขอความอนุเคราะห์การฝึกงาน</a></div>
                                        <div className='sendBook'><a href={data.Remit_Form}>หนังสือส่งตัว</a></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='upload'>
                            <h2>อัพโหลดรายงานการฝึกงาน</h2>
                            <div className='uploadFile'>
                                <input type="file" onChange={AddFileEvent} />
                            </div>
                        </div>
                        <div className='upload'>
                            <h2>ไฟล์นำเสนอการฝึกงาน</h2>
                            <div className='uploadFile'>
                                <input type="file" onChange={AddFileEvent2} />
                            </div>
                        </div>
                        <div className='upload'>

                        </div>
                        <div className='download'>
                            <div className='button'>
                                <div className='sendBook' onClick={addData}>อัปโหลดเอกสาร</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ReportInternship;