// CSS
import './style/ApproveDocument.css';
// Components
import NavbarStaff from './ReuseComponents/NavbarStaff';
import HeaderStaff from './ReuseComponents/HeaderStaff';

import { useLocation, useNavigate } from 'react-router-dom';

import Axios from 'axios'

import React, { useState, useEffect, useRef } from 'react'

import { Document } from 'react-pdf'

function ApproveDocument() {

    const { state } = useLocation();
    const { id } = state;

    const navigate = useNavigate();


    const [vacData, setVacdata] = useState([]);
    const [FileUpdate, setFileUpdate] = useState([]);

    const [file, setFile] = useState();

    useEffect(() => {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });
    }, []);

    const SetUrlFile = (value, name) => {
        if (value.data.length !== 0) {
            let Newblob = new Blob([new Uint8Array(value.data) , {type : 'application/pdf'}])

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(Newblob);
            link.download = name + '.pdf'
            link.click();
        }
    }

    // var blob = new Blob([vacData.map((vac) => { return vac.FileDoc })]),
    //     url = URL.createObjectURL(blob),
    //     img = new Image();
    // img.onload = function () {
    //     URL.revokeObjectURL(this.src);
    //     document.body.appendChild(this);
    // }
    // img.src = url;

    // console.log(url)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            setFile(text);
        };
        reader.readAsText(e.target.files[0]);
    };
    
    const UpdateStatus = (IdVac) => {
        Axios.put("http://localhost:3001/File/update", {
            IdVac: IdVac,
            FileDoc: file
        }).then((response) => {
            setFileUpdate(
                FileUpdate.map((val) => {
                    return val.IdVac == IdVac ? {
                        IdVac: val.IdVac,
                        FileDoc: file,
                    } : val;
                })
            )
            navigate(-1)
            navigate(+1)
        })
    }
        
        return (
                <>
                    <div className="approveDocumentContainer">
                        <NavbarStaff pageNum="3" />
                        <section className="approveDocumentSection">
                            <HeaderStaff />
                            <table className="approveDocumentTable">
                                <tr>
                                    <th>ชื่อสถานที่</th>
                                    <th>เลือกเอกสาร</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {vacData.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.LocationVac}</td>
                                            <td><input type="file" name="file" onChange={saveFile} /></td>
                                            <td><button className="editDocument" onClick={() => { UpdateStatus(data.IdVac) }}>อัพโหลด</button></td>
                                            <td><button className="editDocument" onClick={() => { SetUrlFile(data.FileDoc, data.LocationVac) }}>ตรวจสอบเอกสาร</button></td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </section>
                    </div>
                </>
            )
        }

        export default ApproveDocument;