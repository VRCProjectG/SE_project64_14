// CSS
import './style/NavbarStaff.css';
// IMG
import userLogo from './img/user.png';
import editUserLogo from './img/editUser.png'
import logoutLogo from './img/logout.png'
import placeLogo from './img/place.png';
import checkLogo from './img/check.png';
import approveLogo from './img/approve.png';
// NAVBAR
import { useNavigate, useLocation } from 'react-router-dom';

function NavbarStaff(props){

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
        navigate('/Reservation/EditStaffUser', { state: {id: id}})
    }
    const exitFromReservation = ()=>{
        navigate('/')
    }
    const vaccinePlacePage = ()=>{
        navigate('/Reservation/VaccinePlace', { state: {id: id}})
    }
    const reservationCheckPage = ()=>{
        navigate('/Reservation/ReservationCheck', { state: {id: id}})
    }
    const approveDocumentPage = ()=>{
        navigate('/Reservation/ApproveDocument', { state: {id: id}})
    }

    return(
        <>
            <div className="staffNavContainer">
                <nav className="staffNav">
                    <div className="userEdit">
                        <div className='profile'><img src={userLogo}/></div>
                        <div className='detail'>
                            <div className="name"> {id.NameSurname} </div>
                            <div className="priority">บุคลากร</div>
                            <div className='button'>
                                <img src={editUserLogo} onClick={editUser}/>
                                <img src={logoutLogo} onClick={exitFromReservation}/>
                            </div>
                        </div>
                    </div>
                    <div className="staffPage">
                        <div className={ page1 ? "vaccinePlacePage_Selected" : "vaccinePlacePage"} onClick={vaccinePlacePage}>
                            <img src={placeLogo}/>
                            <div class="title">ข้อมูลสถานที่จองวัคซีน</div>
                        </div>
                        <div className={ page2 ? "reservationCheckPage_Selected" : "reservationCheckPage"} onClick={reservationCheckPage}>
                            <img src={checkLogo}/>
                            <div class="title">ตรวจสอบข้อมูลการจองวัคซีน</div>
                        </div>
                        <div className={ page3 ? "approveDocumentPage_Selected" : "approveDocumentPage"} onClick={approveDocumentPage}>
                            <img src={approveLogo}/>
                            <div class="title">ออกเอกสารในการยืนยัน</div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarStaff;