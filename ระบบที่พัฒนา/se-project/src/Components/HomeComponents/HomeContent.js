// CSS
import { useNavigate } from 'react-router-dom';
// UTILS
import './style/HomeContent.css';

import Axios from 'axios'
import { useState, useEffect } from 'react'

import moment from 'moment';

function HomeContent(){
    const navigate = useNavigate();
    const searchPlacePage = ()=>{
        navigate('/SearchPlace');
    }
    const documentDownload = ()=>{
        navigate('/DocumentDownload');
    }

    const [News, setNews] = useState([]);

    function getNews() {
        Axios.get(`http://localhost:3001/news/getAll`).then((response) => {
            setNews(response.data);
        });
    }

    useEffect(() => {
        getNews();
    }, [])

    return(
        <>
            <div className="HomeContentContainer">
                <div className='internInformationContainer'>
                    <div className="title">ข้อมูลในการฝึกงาน</div>
                    <div className="button">
                        <div onClick={searchPlacePage}>ค้นหาสถานประกอบการ</div>
                        <div onClick={documentDownload}>ดาวน์โหลดเอกสารการฝึกงาน</div>
                    </div>
                </div>
                <div className='advertiseContainer'>
                    <div className="advertise">
                        {News.map((data) => { return (
                            <div className="box">
                                <h2>{data.Title} (ประกาศวันที่ {moment(data.Date_News).format('DD-MM-YYYY')})</h2>
                                <p>{data.Content}</p>
                                <hr/>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeContent;