// CSS
import './style/DocumentDownload.css';
// Components
import NavbarCitizen from './ReuseComponents/NavbarCitizen';
import HeaderCitizen from './ReuseComponents/HeaderCitizen';

import { useLocation } from 'react-router-dom';

import Axios from 'axios'

import React, { useState, useEffect, useRef } from 'react'

function DocumentDownload(){
    const {state} = useLocation();
    const {id} = state;

    const [Status , setStatus] = useState([]);
    const [vacData, setVacdata] = useState([]);
    
    function getVacPlace() {
        Axios.get(`http://localhost:3001/Staff/vacData`).then((response) => {
            setVacdata(response.data);
        });
    }

    const getStatus = (id) => {
        Axios.get(`http://localhost:3001/status/${id}`).then((response) => {
            setStatus(response.data);
        });
    };

    const SetUrlFile = (value, name) => {
        if (value.data.length !== 0) {
            let Newblob = new Blob([new Uint8Array(value.data) , {type : 'application/pdf'}])

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(Newblob);
            link.download = name + '.pdf'
            link.click();
        }
    }

    const FindLocation = (value) => {
        return vacData.find((data) => { return data.IdVac == value })
    }

    useEffect(() => {
        getVacPlace()
        getStatus(id)
    }, []);
    
    return(
        <div className="documentDownloadContainer">
            <NavbarCitizen pageNum="3"/>
            <section className="documentDownloadSection">
                <HeaderCitizen/>
                <div className="documentDownloadButton" onClick={() =>{Status.map((data)=> {return SetUrlFile(FindLocation(data.VacReserve).FileDoc)})}}>ดาวน์โหลดเอกสาร</div>
            </section>
        </div>
    )
}

export default DocumentDownload;