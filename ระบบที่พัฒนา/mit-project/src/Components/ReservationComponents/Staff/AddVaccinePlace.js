// CSS
import './style/AddVaccinePlace.css'
// Utils
import { useNavigate } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function AddVaccinePlace() {

    const [locationName, setlocationName] = useState("");
    const [valueVac, setvalueVac] = useState(0);
    const [dateVac, setdateVac] = useState(new Date());
    const [proviceVac, setproviceVac] = useState(0);
    const [districtsVac, setdistrictsVac] = useState(0);

    const [dataProviceList, setProviceList] = useState([]);
    const [dataDistrictsList, setDistrictsList] = useState([]);

    const [dataListVac, setDataListVac] = useState([]);

    const navigate = useNavigate();
    const goBackToPreviousPage = () => {
        navigate(-1);
    }
    const submitForm = (e) => {
        e.preventDefault();
        addData();
        navigate(-1);
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

    useEffect(() => {
        getProviceList()
    }, []);

    const addData = () => {
        Axios.post("http://localhost:3001/Location/create", {
            locationName: locationName,
            valueVac: valueVac,
            dateVac: dateVac,
            proviceVac: proviceVac,
            districtsVac: districtsVac,
        }).then(() => {
            setDataListVac([
                ...dataListVac,
                {
                    locationName: locationName,
                    valueVac: valueVac,
                    dateVac: dateVac,
                    proviceVac: proviceVac,
                    districtsVac: districtsVac,
                },
            ]);
        });
    };

    const settingcheck = (Name) => {
        getDistrictsList(Name)
    }

    return (
        <>
            <div className="addVaccinePlaceContainer">
                <div className="addVaccinePlaceForm">
                    <h2 className="headTitle">เพิ่มสถานที่การจองวัคซีน</h2>
                    <form onSubmit={submitForm}>
                        <div className="addRow1">
                            <div className="locationVaccine">
                                <div className="title">สถานที่ฉีดวัคซีน<label className='asterisk'> *</label></div>
                                <input name="locationVaccine" type="text" placeholder="กรอกชื่อสถานที่ฉีดวัคซีน"
                                    onChange={(event) => { setlocationName(event.target.value) }} required />
                            </div>

                            <div className="valueVaccine">
                                <div className="title">จำนวนวัคซีน<label className='asterisk'> *</label></div>
                                <input name="valueVaccine" type="text" placeholder="กรอกจำนวนวัคซีน" required
                                    onChange={(event) => { setvalueVac(event.target.value) }} />
                            </div>
                        </div>

                        <div className="addRow2">
                            <div className="dateVaccine">
                                <div className="title">วันที่เริ่มต้นการฉีดวัคซีน<label className='asterisk'> *</label></div>
                                <input name="dateVaccine" type="date" placeholder="กรอกวันที่เริ่มต้นในการฉีดวัคซีน"
                                    onChange={(event) => { setdateVac(event.target.value) }} required />
                            </div>

                            <div className="provinceHospital">
                                <div className="title">จังหวัด<label className='asterisk'> *</label></div>

                                <select name="province" required onChange={(event) => { setproviceVac(event.target.value) }}>
                                    <option selected='selected' hidden>----จังหวัด----</option>
                                    {dataProviceList.map((proviceName) => {
                                        return <option value={proviceName.IdProvice}
                                            onClick={() => { settingcheck(proviceName.IdProvice) }}>{proviceName.NameProviceTh}</option>
                                    }
                                    )}
                                    {useEffect(() => {
                                        getDistrictsList()
                                    }, [])}
                                </select>

                            </div>

                            <div className="districtHospital">
                                <div className="title">เขต</div>

                                <select name="district" required onChange={(event) => { setdistrictsVac(event.target.value) }}>
                                    <option selected='selected' hidden>----อำเภอ/เขต----</option>
                                    {dataDistrictsList.map((districtsName) => {
                                        return <option value={districtsName.IdDistrict}>{districtsName.NameDistrictTh}</option>
                                    }
                                    )}
                                
                                </select>

                            </div>
                        </div>

                        <div className="buttonForm">
                            <button className="submit" type="submit" >ยืนยัน</button>
                            <button className="back" onClick={goBackToPreviousPage}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddVaccinePlace;