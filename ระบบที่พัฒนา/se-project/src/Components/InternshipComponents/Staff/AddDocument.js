// CSS
import './style/AddDocument.css';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react'

import Axios from 'axios'

function AddDocument() {
    const { state } = useLocation();
    const { Id, DataId } = state

    const navigate = useNavigate();

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [file2, setFile2] = useState();
    const [fileName2, setFileName2] = useState();

    const [FileList, setFileList] = useState([]);
    const [Nisit] = useState(Id.Nisit_ID);

    const previousPage = () => {
        navigate('/StaffInternship/CongratuationApprove', { state: { id: DataId } });
    }

    const AddFileEvent = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const AddFileEvent2 = (event) => {
        setFile2(event.target.files[0]);
        setFileName2(event.target.files[0].name);
    }

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

            Axios.post("http://localhost:3001/staff/addPetition", {
                Assist_Form: fileName,
                Remit_Form: fileName2,
                Date_Report: new Date().toJSON().slice(0, 10),
                nisit_ID: Nisit
            }).then((response) => {
                setFileList([
                    ...FileList,
                    {
                        Assist_Form: fileName,
                        Remit_Form: fileName2,
                        Date_Report: new Date().toJSON().slice(0, 10),
                        nisit_ID: Nisit
                    },
                ]);
            });
            navigate('/StaffInternship/CongratuationApprove', { state: { id: DataId } });
        }
        else alert("กรุณาใส่ไฟล์ให้ครบ")
    };

    return (
        <>
            <div className="addDocumentContainer">
                <div className='addDocumentSection'>
                    <div className='title'>
                        <h2>เพิ่มเอกสาร "<span>{Id.NAME}</span>"</h2>
                        <hr />
                    </div>
                    <form className='addDocumentForm' >
                        <div className='petition'>
                            <div className='title'>
                                <h3>อัพโหลดหนังสือขอความอนุเคราะห์ฝึกงาน</h3>
                            </div>
                            <input type="file" name="petitionFile" onChange={AddFileEvent} />
                        </div>
                        <div className='sendPerson'>
                            <div className='title'>
                                <h3>อัพโหลดออกหนังสือส่งตัว</h3>
                            </div>
                            <input type="file" name="sendPersonFile" onChange={AddFileEvent2} />
                        </div>
                        <div className='button'>
                            <button type='submit' onClick={addData}>อัพโหลด</button>
                            <button onClick={previousPage}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDocument;