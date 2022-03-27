// CSS
import './style/Register.css';
// Utils
import { useNavigate } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function Register() {
    const navigate = useNavigate();
    const homePage = () => {
        navigate('/');
    }

    const [name, setName] = useState("");
    const [birth, setBirth] = useState(new Date());
    const [address, setAddress] = useState("");
    const [provice, setProvice] = useState(0);
    const [districts, setdistricts] = useState(0);
    const [subdistricts, setsubdistricts] = useState(0);
    const [idcard, setIdcard] = useState("");
    const [telenum1, setTelenum1] = useState(0);
    const [telenum2, setTelenum2] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ZipCode, setZipCode] = useState(0);

    const [dataList, setDataList] = useState([]);
    const [dataallUser, setallUser] = useState([]);

    const [dataProviceList, setProviceList] = useState([]);
    const [dataDistrictsList, setDistrictsList] = useState([]);
    const [dataSubDistrictsList, setSubDistrictsList] = useState([]);

    function getallUser() {
        Axios.get(`http://localhost:3001/user`).then((response) => {
            setallUser(response.data);
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

    const getSubDistrictsList = (IdDistrict) => {
        Axios.get(`http://localhost:3001/subdistricts/${IdDistrict}`).then((response) => {
            setSubDistrictsList(response.data);
        });
    };

    useEffect(() => {
        getallUser()
        getProviceList()
    }, []);

    const addData = () => {
        Axios.post("http://localhost:3001/user/create", {
            name: name,
            birth: birth,
            address: address,
            provice: provice,
            districts: districts,
            subdistricts: subdistricts,
            idcard: idcard,
            telenum1: telenum1,
            telenum2: telenum2,
            email: email,
            zipcode: ZipCode,
            password: password
        }).then(() => {
            setDataList([
                ...dataList,
                {
                    name: name,
                    birth: birth,
                    address: address,
                    provice: provice,
                    districts: districts,
                    subdistricts: subdistricts,
                    idcard: idcard,
                    telenum1: telenum1,
                    telenum2: telenum2,
                    email: email,
                    zipcode: ZipCode,
                    password: password
                },
            ]);
        });
    };

    const settingcheck = (Name) => {
        getDistrictsList(Name)
        getSubDistrictsList(0)
    }

    function IsSameEmail(AllEmail) {
        return AllEmail.Email === email
    }

    const submitRegisterForm = (e) => {
        e.preventDefault();

        if (dataallUser.find(IsSameEmail) == null) {
            addData();
            navigate('/');
        }
    }


    return (
        <>
            <div className="registerContainer">
                <div className='registerForm'>
                    <h2 className="headTitle">สมัครสมาชิก</h2>
                    <form onSubmit={submitRegisterForm}>
                        <div className='hrForm'>
                            <h3>ข้อมูลส่วนตัว</h3>
                            <hr />
                        </div>
                        <div className="registerRow1">
                            <div className="nameSurname">
                                <div className="title">ชื่อ/นามสกุล<label className='asterisk'> *</label></div>
                                <input name="nameSurname" type="text" placeholder="กรอกชื่อนามสกุล"
                                    onChange={(event) => { setName(event.target.value) }} required />
                            </div>
                            <div className="birth">
                                <div className="title">วันเดือนปีเกิด<label className='asterisk'> *</label></div>
                                <input name="birth" type="date" placeholder="กรอกวันเดือนปีเกิด"
                                    onChange={(event) => { setBirth(event.target.value) }} required />
                            </div>
                        </div>
                        <div className="registerRow2">
                            <div className="idCard">
                                <div className="title">เลขประจำตัวประชาชน<label className='asterisk'> *</label></div>
                                <input name="idCard" type="text" placeholder="กรอกเลขประจำตัวประชาชน"
                                    onChange={(event) => { setIdcard(event.target.value) }} required />
                            </div>
                            <div className="telephone1">
                                <div className="title">เบอร์โทรหลัก<label className='asterisk'> *</label></div>
                                <input name="telephone1" type="text" placeholder="กรอกเบอร์โทรหลัก"
                                    onChange={(event) => { setTelenum1(event.target.value) }} required />
                            </div>
                            <div className="telephone2">
                                <div className="title">เบอร์โทรสำรอง</div>
                                <input name="telephone2" type="text" placeholder="กรอกเบอร์โทรสำรอง"
                                    onChange={(event) => { setTelenum2(event.target.value) }} />
                            </div>
                        </div>
                        <div className='hrForm'>
                            <h3>รายละเอียดที่อยู่</h3>
                            <hr />
                        </div>
                        <div className="registerRow3">
                            <div className="address">
                                <div className="title">ที่อยู่<label className='asterisk'> *</label></div>
                                <input name="address" type="text" placeholder="กรอกที่อยู่"
                                    onChange={(event) => { setAddress(event.target.value) }} required />
                            </div>
                            <div className="province">
                                <div className="title">จังหวัด<label className='asterisk'> *</label></div>

                                <select name="province" required onChange={(event) => { setProvice(event.target.value) }}>
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
                        </div>

                        <div className="registerRow4">
                            <div className="district">
                                <div className="title">อำเภอ/เขต<label className='asterisk'> *</label></div>

                                <select name="district" required onChange={(event) => { setdistricts(event.target.value) }}>
                                    <option selected='selected' hidden>----อำเภอ/เขต----</option>
                                    {dataDistrictsList.map((districtsName) => {
                                        return <option value={districtsName.IdDistrict}
                                            onClick={() => { getSubDistrictsList(districtsName.IdDistrict) }}>{districtsName.NameDistrictTh}</option>
                                    }
                                    )}
                                    {useEffect(() => {
                                        getSubDistrictsList()
                                    }, [])}
                                </select>

                            </div>
                            <div className="subDistrict">
                                <div className="title">แขวง/ตำบล<label className='asterisk'> *</label></div>

                                <select name="subDistrict" required onChange={(event) => { setsubdistricts(event.target.value) }}>
                                    <option selected='selected' hidden>----แขวง/ตำบล----</option>
                                    {dataSubDistrictsList.map((SubDistrictsName) => {
                                        return <option value={SubDistrictsName.IdSubDisctrict} >{SubDistrictsName.name_thSubDisctict}</option>
                                    }
                                    )}
                                </select>
                            </div>
                            <div className="zipcode">
                                <div className="title">รหัสไปรษณีย์<label className='asterisk'> *</label></div>
                                <input name="zipcode" type="text" placeholder="กรอกรหัสไปรษณีย์" onChange={(event) => { setZipCode(event.target.value) }} required />
                            </div>
                        </div>
                        <div className='hrForm'>
                            <h3>ตั้งค่าบัญชี</h3>
                            <hr />
                        </div>
                        <div className="registerRow5">
                            <div className="email">
                                <div className="title">อีเมล<label className='asterisk'> *</label></div>
                                <input name="email" type="email" placeholder="กรอกอีเมล" onChange={(event) => { setEmail(event.target.value) }} required />
                            </div>
                            <div className="password">
                                <div className="title">รหัสผ่าน<label className='asterisk'> *</label></div>
                                <input name="password" type="password" placeholder="กรอกรหัสผ่าน" onChange={(event) => { setPassword(event.target.value) }} required />
                            </div>
                        </div>
                        <div className="buttonForm">
                            <button className="submit" type="submit" >ยืนยัน</button>
                            <button className="back" onClick={homePage}>ยกเลิก</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;