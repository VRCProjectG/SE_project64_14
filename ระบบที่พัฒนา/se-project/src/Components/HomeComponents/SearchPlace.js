// CSS
import './style/SearchPlace.css';
// Utils
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import Axios from 'axios'

function SearchPlace() {
    const navigate = useNavigate();
    const previousPage = () => {
        navigate(-1);
    }

    const [Search, setSearch] = useState("");
    const [Location, setLocation] = useState([]);

    function getLocation() {
        Axios.get(`http://localhost:3001/LocationInternship`).then((response) => {
            setLocation(response.data);
        });
    }

    function getLocationSearch(id) {
        Axios.get(`http://localhost:3001/LocationInternshipSearch/${id}`).then((response) => {
            setLocation(response.data);
        });
    }

    useEffect(() => {
        getLocation();
    }, [])

    const SecrchEvent = (e) => {
        e.preventDefault();
        if (Search !== "") getLocationSearch(Search);
        else getLocation()
    }

    return (
        <>
            <div className="searchPlaceContainer">
                <header>
                    <div onClick={previousPage}>&larr;</div>
                    <div>มหาวิทยาลัยเกษตรศาสตร์</div>
                    <div>&larr;</div>
                </header>
                <section className="searchPlaceSection">
                    <div className='title'>
                        <h2>สถานที่ประกอบการฝึกงาน</h2>
                        <hr />
                    </div>
                    <div className='searchContainer'>
                        <form className='search'>
                            <input type="text" name="search" onChange={(event) => { setSearch(event.target.value) }} />
                            <button onClick={SecrchEvent}>ค้นหา</button>
                        </form>
                    </div>
                    <div className='table'>
                        <table cellSpacing={0}>
                            <tr>
                                <th>ชื่อ</th>
                                <th>ตำแหน่ง</th>
                                <th>จำนวน</th>
                                <th>ลักษณะงาน</th>
                            </tr>
                            {Location.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.Name}</td>
                                        <td>{data.JobTitle}</td>
                                        <td>{data.Amount}</td>
                                        <td>{data.JobDescrip}</td>
                                    </tr>
                                )
                            }
                            )}
                        </table>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SearchPlace;