// CSS
import './style/DocumentDownload.css';
// Utils
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Axios from 'axios'

function DocumentDownload() {
    const navigate = useNavigate();
    const previousPage = () => {
        navigate(-1);
    }

    const [AllFile, setAllFile] = useState([]);

    function getAllFile() {
        Axios.get(`http://localhost:3001/FileUp/getAll`).then((response) => {
            setAllFile(response.data);
        });
    }

    useEffect(() => {
        getAllFile();
    }, [])

    return (
        <>
            <div className="documentDownloadContainer">
                <header>
                    <div onClick={previousPage}>&larr;</div>
                    <div>มหาวิทยาลัยเกษตรศาสตร์</div>
                    <div>&larr;</div>
                </header>
                <section className="documentDownloadSection">
                    <div className='title'>
                        <h2>ดาวน์โหลดเอกสารฝึกงาน</h2>
                        <hr />
                    </div>
                    <div className='downloadContainer'>
                        {AllFile.map((data) => {
                            return (
                                <div className='document'>
                                    <div className='name'>{data.NameUpFile}</div>
                                    <div className='inspect'><a href={data.LinkUpFile}>คลิกเพื่อดู</a></div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}

export default DocumentDownload;