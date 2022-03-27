// CSS
import './style/Announce.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';
// Utils
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import moment from 'moment';

function Announce() {

    const [news, setnews] = useState([]);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Date_News] = useState(new Date().toJSON().slice(0, 10));

    const [News, setNews] = useState([]);

    const navigate = useNavigate();
    const editAnnouncePage = (value) => {
        navigate('/StaffInternship/AnnounceEdit', {state: {Id: value}});
    }
    const deleteAnnouncePage = (value) => {
        navigate('/StaffInternship/AnnounceDelete', {state: {Id: value}});
    }

    function getNews() {
        Axios.get(`http://localhost:3001/news/getAll`).then((response) => {
            setNews(response.data);
        });
    }

    useEffect(() => {
        getNews();
    }, [])

    const addData = () => {
        Axios.post("http://localhost:3001/news/add", {
            Title: Title,
            Content: Content,
            Date_News: Date_News,
        }).then(() => {
            setnews([
                ...news,
                {
                    Title: Title,
                    Content: Content,
                    Date_News: Date_News,
                },
            ]);
        });
    };

    const submitAddForm = (e) => {
        e.preventDefault();
        if(Title !== "" && Content !== ""){
            addData();
            navigate(-1);
            navigate(+1);
        }
        else alert("กรุณากรอกช่องหัวข้อและเนื้อหา")
       
        
    }

    return (
        <>
            <div className="announceContainer">
                <NavbarStaff pageNum="5" />
                <section className="announceSection">
                    <HeaderStaff />
                    <div className='information'>
                        <div className='title'>
                            <h2>อัพโหลดประกาศวันที่ {moment(Date_News).format('DD-MM-YYYY')}</h2>
                            <hr />
                        </div>
                        <div className='inputAndTable'>
                            <form className='input' onSubmit={submitAddForm}>
                                <div className='title'>
                                    <label>หัวข้อ</label>
                                    <input type="text" name="title"
                                        onChange={(event) => {
                                            setTitle(event.target.value)
                                        }}/>
                                </div>
                                <div className='content'>
                                    <label>เนื้อหา</label>
                                    <textarea name="content"
                                        onChange={(event) => {
                                            setContent(event.target.value)
                                        }}/>
                                </div>
                                <button type='submit'>อัพโหลดประกาศ</button>
                            </form>
                            <div className='table'>
                                <table>
                                    {News.map((data) => { return(
                                        <tr>
                                            <td>{data.Title} "{moment(data.Date_News).format('DD-MM-YYYY')}"</td>
                                            <td><div className='editButton' onClick={() => {editAnnouncePage(data)}}>ตรวจสอบ/แก้ไข</div></td>
                                            <td><div className='deleteButton' onClick={() => {deleteAnnouncePage(data)}}>ลบ</div></td>
                                        </tr>
                                    )})}
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </>
    )
}

export default Announce;