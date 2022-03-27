// CSS
import './style/NavbarCitizen.css';
// IMG
import userLogo from './img/user.png';
import editUserLogo from './img/editUser.png'
import logoutLogo from './img/logout.png'
import dotLogo from './img/dot.png';
import reservationLogo from './img/reservation.png';
import downloadLogo from './img/downloadDoc.png';
// NAVBAR
import { useNavigate,useLocation } from 'react-router-dom';
function NavbarCitizen(props){

    const {state} = useLocation();
    const {id} = state;

    const page=props.pageNum;
    let page1 = false;
    let page2 = false;
    let page3 = false;
    if(page==="1"){
        page1 = true;
    } else if (page==="2"){
        page2 = true;
    } else if (page==="3"){
        page3 = true;
    }

    const navigate = useNavigate();
    const editUser = ()=>{
        navigate('/Reservation/EditCitizenUser',{ state: {id: id}});
    }
    const exitFromReservation = ()=>{
        navigate('/')
    }
    const statusCheckPage = ()=>{
        navigate('/Reservation/StatusCheck',{ state: {id: id}})
    }
    const vaccineReservationPage = ()=>{
        navigate('/Reservation/VaccineReservation',{ state: {id: id}})
    }
    const downloadDocumentPage = ()=>{
        navigate('/Reservation/DocumentDownload',{ state: {id: id}})
    }

    return(
        <>
            <div className="citizenNavContainer">
                <nav className="citizenNav">
                    <div className="userEdit">
                        <div className='profile'><img src={userLogo}/></div>
                        <div className='detail'>
                            <div className="name">{id.NameSurname}</div>
                            <div className="priority">ประชาชน</div>
                            <div className='button'>
                                <img src={editUserLogo} onClick={editUser}/>
                                <img src={logoutLogo} onClick={exitFromReservation}/>
                            </div>
                        </div>
                    </div>
                    <div className="citizenPage">
                        <div className={ page1 ? "statusCheckPage_Selected" : "statusCheckPage"} onClick={statusCheckPage}>
                            <img src={dotLogo}/>
                            <div class="title">สถานะการจองวัคซีน</div>
                        </div>
                        <div className={ page2 ? "vaccineReservationPage_Selected" : "vaccineReservationPage"} onClick={vaccineReservationPage}>
                            <img src={reservationLogo}/>
                            <div class="title">จองคิวฉีดวัคซีน</div>
                        </div>
                        <div className={ page3 ? "downloadDocumentPage_Selected" : "downloadDocumentPage"} onClick={downloadDocumentPage}>
                            <img src={downloadLogo}/>
                            <div class="title">ดาวน์โหลดเอกสาร</div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarCitizen;