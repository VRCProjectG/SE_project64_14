// CSS
import './style/UploadDocument.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Axios from 'axios'

function UploadDocument() {

    const [FileList, setFileList] = useState([]);
    const [AllFile, setAllFile] = useState([]);

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();
    const uploadDocumentDeletePage = (value) => {
        navigate('/StaffInternship/UploadDocumentDelete', { state: { Id: value } })
    }

    function getAllFile() {
        Axios.get(`http://localhost:3001/FileUp/getAll`).then((response) => {
            setAllFile(response.data);
        });
    }

    useEffect(() => {
        getAllFile();
    }, [])

    const addData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        Axios.post("http://localhost:3001/uploadfile", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })

        Axios.post("http://localhost:3001/staff/upFile", {
            NameUpFile: fileName,
        }).then((response) => {
            setFileList([
                ...FileList,
                {
                    NameUpFile: fileName,
                },
            ]);
        });

        navigate(-1);
        navigate(+1);
    };

    const AddFileEvent = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    return (
        <>
            <div className="uploadDocumentContainer">
                <NavbarStaff pageNum="6" />
                <section className="uploadDocumentSection">
                    <HeaderStaff />
                    <div className='information'>
                        <div className='title'>
                            <h2>เอกสารการฝึกงาน</h2>
                            <hr />
                        </div>
                        <div className='inputAndTable'>
                            <form className='input'>
                                <h3>อัพโหลดเอกสารการฝึกงาน</h3>
                                <div className='addFile'><input type="file" name='addFile' onChange={AddFileEvent} /></div>
                                <div className='button'>
                                    <button type='submit' onClick={addData}>อัพโหลดไฟล์</button>
                                </div>
                            </form>
                            <div className='table'>
                                <h3>ลบ/แก้ไขเอกสารการฝึกงาน</h3>
                                <table>
                                    {AllFile.map((data) => {
                                        return (
                                            <tr>
                                                <td>{data.NameUpFile}</td>
                                                <td><a href={data.LinkUpFile}><div className='inspectButton'>คลิกเพื่อดู</div></a></td>
                                                <td><div className='deleteButton' onClick={() => uploadDocumentDeletePage(data)}>ลบ</div></td>
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UploadDocument;