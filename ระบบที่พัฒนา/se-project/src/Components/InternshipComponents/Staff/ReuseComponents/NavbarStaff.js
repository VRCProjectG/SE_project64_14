// CSS
import './style/NavbarStaff.css';
// IMG
import userLogo from './img/user.png';
import companyLogo from './img/company.png';
import validationLogo from './img/validation.png';
import summaryLogo from './img/summary.png'
import congratLogo from './img/congrat.png';
import announceLogo from './img/announce.png';
import uploadLogo from './img/upload.png';
// NAVBAR
import { useNavigate, useLocation } from 'react-router-dom';

function NavbarStaff(props) {

    const { state } = useLocation();
    const { id } = state

    const page = props.pageNum;
    let page1 = false;
    let page2 = false;
    let page3 = false;
    let page4 = false;
    let page5 = false;
    let page6 = false;
    if (page === "1") {
        page1 = true;
    } else if (page === "2") {
        page2 = true;
    } else if (page === "3") {
        page3 = true;
    } else if (page === "4") {
        page4 = true;
    } else if (page === "5") {
        page5 = true;
    } else if (page === "6") {
        page6 = true;
    }


    const navigate = useNavigate();
    const companyPage = () => {
        navigate('/StaffInternship/Company', { state: { id: id } })
    }
    const petitionValidationPage = () => {
        navigate('/StaffInternship/PetitionValidation', { state: { id: id } })
    }
    const summaryApprovePage = () => {
        navigate('/StaffInternship/SummaryApprove', { state: { id: id } })
    }
    const congratuationApprovePage = () => {
        navigate('/StaffInternship/CongratuationApprove', { state: { id: id } })
    }
    const announcePage = () => {
        navigate('/StaffInternship/Announce', { state: { id: id } })
    }
    const uploadDocumentPage = () => {
        navigate('/StaffInternship/UploadDocument', { state: { id: id } })
    }

    return (
        <>
            <div className="StaffNavContainer">
                <nav className="StaffNav">
                    <div className="userInfo">
                        <div className='profile'><img src={userLogo} /></div>
                        <div className='detail'>
                            <div className="name">{id.A_Name}</div>
                            <div className="priority">{id.A_Posittion}</div>
                        </div>
                    </div>
                    <div className="StaffPage">
                        <div className={page1 ? "link_Selected" : "companyPage"} onClick={companyPage}>
                            <img src={companyLogo} />
                            <div class="title">สถานประกอบการ</div>
                        </div>
                        <div className={page2 ? "link_Selected" : "petitionValidationPage"} onClick={petitionValidationPage}>
                            <img src={validationLogo} style={{ width: "3rem" }} />
                            <div class="title">ตรวจสอบคำร้อง</div>
                        </div>
                        <div className={page3 ? "link_Selected" : "summaryApprove"} onClick={summaryApprovePage}>
                            <img src={summaryLogo} style={{ width: "3rem" }} />
                            <div class="title">สรุปการอนุมัติฝึกงาน</div>
                        </div>
                        <div className={page4 ? "link_Selected" : "congratuationApprove"} onClick={congratuationApprovePage}>
                            <img src={congratLogo} style={{ width: "3rem" }} />
                            <div class="title">อัปโหลดเอกสารส่งตัว<br></br>อนุมัติคำร้องจบการศึกษา</div>
                        </div>
                        <div className={page5 ? "link_Selected" : "announce"} onClick={announcePage}>
                            <img src={announceLogo} style={{ width: "3rem" }} />
                            <div class="title">ประกาศ</div>
                        </div>
                        <div className={page6 ? "link_Selected" : "uploadDocument"} onClick={uploadDocumentPage}>
                            <img src={uploadLogo} style={{ width: "3rem" }} />
                            <div class="title">เอกสารการฝึกงาน</div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default NavbarStaff;