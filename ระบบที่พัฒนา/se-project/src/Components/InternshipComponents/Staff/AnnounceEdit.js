// CSS
import './style/AnnounceEdit.css';
// UTILS
import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react'

import Axios from 'axios'

import moment from 'moment';

function AnnounceEdit() {
    const { state } = useLocation();
    const { Id } = state;

    const [Title, setTitle] = useState(Id.Title);
    const [Content, setContent] = useState(Id.Content);

    const [NewsList, setNewsList] = useState([]);

    const navigate = useNavigate();
    const previousPage = () => {
        navigate(-1);
    }

    const updateData = (News_id) => {
        Axios.put("http://localhost:3001/update/news", {
            Title: Title,
            Content: Content,
            News_id: Id.News_id
        }).then((response) => {
            setNewsList(
                NewsList.map((val) => {
                    return val.News_id == Id.News_id ? {
                        News_id: val.News_id,
                        Title: Title,
                        Content: Content,
                    } : val;
                })
            )
        })
    }

    const submitEditForm = (e) => {
        e.preventDefault();
        if(Title !== "" && Content !== ""){
            updateData(Id.Id);
            navigate(-1);
        }
        else alert("กรุณากรอกช่องหัวข้อและเนื้อหา")
    }

    return (
        <>
            <div className="announceEditContainer">
                <section className="announceEditSection">
                    <div className='information'>
                        <div className='title'>
                            <h2>แก้ไขประกาศ "{Id.Title} {moment(Id.Date_News).format('DD-MM-YYYY')}"</h2>
                            <hr />
                        </div>
                        <div className='inputContainer'>
                            <form className='input'>
                                <div className='title'>
                                    <label>หัวข้อ</label>
                                    <input type="text" Value={Id.Title} name="title" onChange={(e) => { setTitle(e.target.value) }} />
                                </div>
                                <div className='content'>
                                    <label>เนื้อหา</label>
                                    <textarea name="content" onChange={(e) => { setContent(e.target.value)}}>{Id.Content}</textarea>
                        </div>
                        <div className='button'>
                            <button type='submit' onClick={submitEditForm}>แก้ไขประกาศ</button>
                            <div className='back' onClick={previousPage}>ย้อนกลับ</div>
                        </div>
                    </form>
            </div>
        </div>

                </section >
            </div >
        </>
    )
}

export default AnnounceEdit;