// CSS
import './style/UploadDocumentDelete.css';
// UTILS
import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react'

import Axios from 'axios'

function UploadDocumentDelete() {
    const { state } = useLocation();
    const { Id } = state

    const [File, setFile] = useState([]);

    const navigate = useNavigate();
    const previousPage = () => {
        navigate(-1);
    }

    const deleteFile = (e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/deleteFile/${Id.IdUpFile}`).then((response) => {
            setFile(
                File.filter((val) => {
                    return val.IdUpFile !== Id.IdUpFile;
                })
            )
            navigate(-1);
        })
    }

    return (
        <>
            <div className="uploadDocumentDeleteContainer">
                <section className="uploadDocumentDeleteSection">
                    <div className='information'>
                        <div className='title'>
                            <h2>ต้องการจะลบไฟล์ {Id.NameUpFile} หรือไม่</h2>
                            <hr />
                        </div>
                        <div className='inputContainer'>
                            <form className='input'>
                                <div className='button'>
                                    <button type='submit' onClick={deleteFile}>ลบไฟล์</button>
                                    <div className='back' onClick={previousPage}>ย้อนกลับ</div>
                                </div>
                            </form>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default UploadDocumentDelete;