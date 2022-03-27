// CSS
import './style/EditCitizenUser.css';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';

import Axios from 'axios'

import { useState, useEffect } from 'react'

function EditCitizenUser() {

    const { state } = useLocation();
    const { id } = state;

    const [newName, setnewName] = useState(id.NameSurname);

    const [newBirth, setnewBirth] = useState(id.DateOfBirth.slice(0, 10));
    const [newAddress, setnewAddress] = useState(id.Address);
    const [newProvice, setnewProvice] = useState(id.ProvincesUser);
    const [newSubdistricts, setnewSubdistricts] = useState(id.SubDistrictsUser);
    const [newDistricts, setnewDistricts] = useState(id.DistrictUser);
    const [newIdcard, setnewIdcard] = useState(id.IdCard);
    const [newTelenum1, setnewTelenum1] = useState(id.Telephone);
    const [newTelenum2, setnewTelenum2] = useState(id.TelephoneR);
    const [newEmail, setnewEmail] = useState(id.Email);
    const [newPassword, setnewPassword] = useState(id.Password);
    const [newZipCode, setnewZipCode] = useState(id.zipcode);


    const [dataallUser, setallUser] = useState([]);

    const [dataProviceList, setProviceList] = useState([]);
    const [dataDistrictsList, setDistrictsList] = useState([]);
    const [dataSubDistrictsList, setSubDistrictsList] = useState([]);

    function getallUser() {
        Axios.get(`http://localhost:3001/user`).then((response) => {
            setallUser(response.data);
        });
    }


    const getProviceList = (IdProvince, IdDistrict,Name) => {
        Axios.get("http://localhost:3001/provice").then((response) => {
            setProviceList(response.data);
        });
    };

    const getDistrictsList = (IdProvice = id.ProvincesUser) => {
        Axios.get(`http://localhost:3001/districts/${IdProvice}`).then((response) => {
            setDistrictsList(response.data);
        });
    };

    const getSubDistrictsList = (IdDistrict = id.DistrictUser) => {
        Axios.get(`http://localhost:3001/subdistricts/${IdDistrict}`).then((response) => {
            setSubDistrictsList(response.data);
        });
    };

    const updateData = (IdUser) => {
        Axios.put("http://localhost:3001/user/update", {
            name: newName,
            birth: newBirth,
            address: newAddress,
            provice: newProvice,
            districts: newDistricts,
            subdistricts: newSubdistricts,
            zipcode: newZipCode,
            idcard: newIdcard,
            telenum1: newTelenum1,
            telenum2: newTelenum2,
            email: newEmail,
            password: newPassword,
            IdUser: IdUser
        }).then((response) => {
            setallUser(
                dataallUser.map((val) => {
                    return val.IdUser == IdUser ? {
                        IdUser: val.IdUser,
                        name: newName,
                        birth: newBirth,
                        address: newAddress,
                        provice: newProvice,
                        districts: newDistricts,
                        subdistricts: newSubdistricts,
                        zipcode: newZipCode,
                        idcard: newIdcard,
                        telenum1: newTelenum1,
                        telenum2: newTelenum2,
                        email: newEmail,
                        password: newPassword
                    } : val;
                })
            )
        })
    }

    useEffect(() => {
        getProviceList()
        getDistrictsList()
        getSubDistrictsList()
        getallUser()
    }, []);

    const navigate = useNavigate();
    const reservationPage = () => {
        navigate(-1);
    }

    if(newPassword.length === 0) setnewPassword(id.Password)

    function IsSameEmail(AllEmail) {
        return AllEmail.Email === newEmail
    }

    const submitEditCitizenForm = (e) => {
        e.preventDefault();

        const GetUserCheckEmail = dataallUser.find(IsSameEmail)

        if(GetUserCheckEmail.IdUser == id.IdUser || GetUserCheckEmail == null) 
        {
            updateData(id.IdUser)

            const ObjectId = {
                IdUser: id.IdUser,
                NameSurname: newName,
                DateOfBirth: newBirth,
                Address: newAddress,
                ProvincesUser: parseInt(newProvice),
                DistrictUser: parseInt(newDistricts),
                SubDistrictsUser: parseInt(newSubdistricts),
                IdCard: newIdcard,
                Telephone: newTelenum1,
                TelephoneR: newTelenum2,
                Email: newEmail,
                Password: newPassword,
                zipcode: newZipCode,
                StatusAcc: id.StatusAcc
            }

            navigate('/Reservation/StatusCheck', { state: { id: ObjectId } });
        }
            
}

const CheckSelect = (id1, id2) => {
    return id1 === id2 ? 'selected' : ''
}

const settingcheck = (Name) => {
    getDistrictsList(Name)
    getSubDistrictsList(0)
}

return (
    <>
        <div className="editCitizenContainer">
            <div className='editCitizenForm'>
                <h2 className="headTitle">แก้ไขข้อมูลประชาชน</h2>
                <form onSubmit={submitEditCitizenForm}>
                    <div className='hrForm'>
                        <h3>ข้อมูลส่วนตัว</h3>
                        <hr />
                    </div>
                    <div className="editCitizenRow1">
                        <div className="nameSurname">
                            <div className="title">ชื่อ/นามสกุล</div>
                            <input name="nameSurname" type="text" placeholder="กรอกชื่อ" required
                                Value={id.NameSurname}
                                onChange={(event) => {
                                    setnewName(event.target.value)
                                }}
                            />
                        </div>
                        <div className="birth">
                            <div className="title">วันเดือนปีเกิด</div>
                            <input name="birth" type="date" placeholder="กรอกวันเดือนปีเกิด" required
                                Value={id.DateOfBirth.slice(0, 10)}
                                onChange={(event) => {
                                    setnewBirth(event.target.value)
                                }}
                            />

                        </div>
                    </div>
                    <div className="editCitizenRow2">
                        <div className="idCard">
                            <div className="title">เลขประจำตัวประชาชน</div>
                            <input name="idCard" type="text" placeholder="กรอกเลขประจำตัวประชาชน" required
                                Value={id.IdCard}
                                onChange={(event) => {
                                    setnewIdcard(event.target.value)
                                }}
                            />
                        </div>
                        <div className="telephone1">
                            <div className="title">เบอร์โทรหลัก</div>
                            <input name="telephone1" type="text" placeholder="กรอกเบอร์โทรหลัก" required
                                Value={id.Telephone}
                                onChange={(event) => {
                                    setnewTelenum1(event.target.value)
                                }}
                            />
                        </div>
                        <div className="telephone2">
                            <div className="title">เบอร์โทรสำรอง</div>
                            <input name="telephone2" type="text" placeholder="กรอกเบอร์โทรสำรอง"
                                Value={id.TelephoneR}
                                onChange={(event) => {
                                    setnewTelenum2(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className='hrForm'>
                        <h3>รายละเอียดที่อยู่</h3>
                        <hr />
                    </div>
                    <div className="editCitizenRow3">
                        <div className="address">
                            <div className="title">ที่อยู่</div>
                            <input name="address" type="text" placeholder="กรอกที่อยู่" required
                                Value={id.Address}
                                onChange={(event) => {
                                    setnewAddress(event.target.value)
                                }}
                            />
                        </div>

                        <div className="province">
                            <div className="title">จังหวัด</div>
                            <select name="province" required onChange={(event) => { setnewProvice(event.target.value) }}  >
                                {dataProviceList.map((proviceName) => {
                                    return <option value={proviceName.IdProvice} selected={CheckSelect(id.ProvincesUser, proviceName.IdProvice)} onClick={() => { settingcheck(proviceName.IdProvice) }}>{proviceName.NameProviceTh}</option>
                                }
                                )}
                                {useEffect(() => {
                                    getDistrictsList()
                                }, [])}
                            </select>
                        </div>
                    </div>

                    <div className="editCitizenRow4">
                        <div className="district">
                            <div className="title">อำเภอ/เขต </div>
                            <select name="district" required onChange={(event) => { setnewDistricts(event.target.value) }}>
                                <option selected='selected' hidden>----อำเภอ/เขต----</option>
                                {dataDistrictsList.map((districtsName) => {
                                    return <option value={districtsName.IdDistrict} selected={CheckSelect(id.DistrictUser, districtsName.IdDistrict)} onClick={() => { getSubDistrictsList(districtsName.IdDistrict) }}>{districtsName.NameDistrictTh}</option>
                                }
                                )}
                                {useEffect(() => {
                                    getSubDistrictsList()
                                }, [])}
                            </select>
                        </div>
                        <div className="subDistrict">
                            <div className="title">แขวง/ตำบล</div>
                            <select name="subDistrict" required onChange={(event) => { setnewSubdistricts(event.target.value) }}>
                                <option selected='selected' hidden>----แขวง/ตำบล----</option>
                                {dataSubDistrictsList.map((SubDistrictsName) => {
                                    return <option value={SubDistrictsName.IdSubDisctrict} selected={CheckSelect(id.SubDistrictsUser, SubDistrictsName.IdSubDisctrict)}>{SubDistrictsName.name_thSubDisctict}</option>
                                })}
                            </select>
                        </div>
                        <div className="zipcode">
                            <div className="title">รหัสไปรษณีย์</div>
                            <input name="zipcode" type="text" placeholder="กรอกรหัสไปรษณีย์" required
                                Value={id.zipcode}
                                onChange={(event) => {
                                    setnewZipCode(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className='hrForm'>
                        <h3>ตั้งค่าบัญชี</h3>
                        <hr />
                    </div>
                    <div className="editCitizenRow5">
                        <div className="email">
                            <div className="title">อีเมล</div>
                            <input name="email" type="email" placeholder="กรอกอีเมล" required
                                Value={id.Email}
                                onChange={(event) => {
                                    setnewEmail(event.target.value)
                                }}
                            />
                        </div>
                        <div className="password">
                            <div className="title">รหัสผ่าน</div>
                            <input name="password" type="password" placeholder="กรอกรหัสผ่าน"
                                onChange={(event) => {
                                    setnewPassword(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className="buttonForm">
                        <button className="submit" type="submit">แก้ไข</button>
                    </div>
                </form>
                <button className="back" onClick={reservationPage}>ยกเลิก</button>
            </div>
        </div >
    </>
)
}

export default EditCitizenUser;