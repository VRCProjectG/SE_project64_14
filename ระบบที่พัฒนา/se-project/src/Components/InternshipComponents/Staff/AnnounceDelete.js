// CSS
import './style/AnnounceDelete.css';
// UTILS
import { useNavigate, useLocation } from 'react-router-dom';

import { useState } from 'react'

import Axios from 'axios'

import moment from 'moment';

function AnnounceDelete() {
    const { state } = useLocation();
    const { Id } = state;

    const [NewsId, setNewsId] = useState([]);
    const [IdNew] = useState(Id.News_id);

    const navigate = useNavigate();
    const previousPage = () => {
        navigate(-1);
    }

    const deleteNew = (e) => {
        e.preventDefault();
        Axios.delete(`http://localhost:3001/deletenews/${Id.News_id}`).then((response) => {
            setNewsId(
                NewsId.filter((val) => {
                    return val.News_id !== Id.News_id;
                })
            )
            navigate(-1);
        })

    }

    return (
        <>
            <div className="announceDeleteContainer">
                <section className="announceDeleteSection">
                    <div className='information'>
                        <div className='title'>
                            <h2>ต้องการจะลบประกาศ "{Id.Title} {moment(Id.Date_News).format('DD-MM-YYYY')}" หรือไม่</h2>
                            <hr />
                        </div>
                        <div className='inputContainer'>
                            <form className='input' >
                                <div className='button'>
                                    <button type='submit' onClick={deleteNew}>ลบประกาศ</button>
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

export default AnnounceDelete;