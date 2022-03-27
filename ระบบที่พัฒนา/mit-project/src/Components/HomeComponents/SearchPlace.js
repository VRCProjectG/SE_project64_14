// CSS
import './style/SearchPlace.css';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function SearchPlace() {

    const [provice, setProvice] = useState(0);
    const [districts, setdistricts] = useState(0);

    const [dataProviceList, setProviceList] = useState([]);
    const [dataDistrictsList, setDistrictsList] = useState([]);

    const [searchData, setSearchData] = useState([]);

    const getSearchHos = (IdProvince, IdDistrict) => {
        Axios.get(`http://localhost:3001/search/${IdProvince}/${IdDistrict}`).then((response) => {
            setSearchData(response.data);
        });
    }

    const getProviceList = () => {
        Axios.get("http://localhost:3001/provice").then((response) => {
            setProviceList(response.data);
        });
    };

    const getDistrictsList = (IdProvice) => {
        Axios.get(`http://localhost:3001/districts/${IdProvice}`).then((response) => {
            setDistrictsList(response.data);
        });
    };

    const submitEditForm = (e) => {
        e.preventDefault();
        getSearchHos(provice,districts);
    }

    useEffect(() => {
        getProviceList()
    }, []);

    return (
        <>

            {console.log(searchData)}
            
            <div className="searchPlaceContainer">
                <div className="headTitle">ค้นหาสถานที่ในการฉีดวัคซีน</div>
                <form onSubmit={submitEditForm}>
                    <div className="inputForm">
                        <div className="province">
                            <select name="province" required onChange={(event) => { setProvice(event.target.value) }}>
                                <option selected='selected' hidden>----จังหวัด----</option>
                                {dataProviceList.map((proviceName) => {
                                    return <option value={proviceName.IdProvice} onClick={() => { getDistrictsList(proviceName.IdProvice) }}>{proviceName.NameProviceTh}</option>
                                }
                                )}
                            </select>
                            {useEffect(() => {
                                getDistrictsList()
                            }, [])}
                        </div>

                        <div className="district">
                            <select name="district" required onChange={(event) => { setdistricts(event.target.value) }}>
                                <option selected='selected' hidden>----อำเภอ/เขต----</option>
                                {dataDistrictsList.map((districtsName) => {
                                    return <option value={districtsName.IdDistrict}>{districtsName.NameDistrictTh}</option>
                                }
                                )}
                            </select>
                        </div>
                    </div>
                    <button type="submit">ค้นหา</button>
                </form>
                <table className="placeTable">
                    <tr>
                        <th>ชื่อสถานที่</th>
                        <th>จำนวน</th>
                        <th>วันเวลา</th>
                        <th>หมายเหตุ</th>
                    </tr>
                    {searchData.map((data) => { return (
                        <tr>
                            <td>{data.LocationVac}</td>
                            <td>{data.ValueVac}</td>
                            <td>{data.DateVac.slice(0,10)}</td>
                            <td>{data.NoteVac}</td>
                        </tr> 
                        )
                    })}

                    
                </table>
            </div>
        </>
    )
}

export default SearchPlace;