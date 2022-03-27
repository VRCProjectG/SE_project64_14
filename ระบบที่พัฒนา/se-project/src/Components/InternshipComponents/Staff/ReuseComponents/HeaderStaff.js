// CSS
import './style/HeaderStaff.css';
// IMG
import logoutLogo from './img/logout.png';
// Utils
import { useNavigate, useLocation } from 'react-router-dom';

function HeaderStudent(){

    const {state} = useLocation();
    const {id} = state;

    const navigate = useNavigate();
    const logout = ()=>{
        navigate('/');
    }

    return(
        <>
            <header className="staffHeaderContainer">
                <div className="titleHead">ระบบการฝึกงาน มหาวิทยาลัยเกษตรศาสตร์</div>
                <div className='nameBox'>
                    <div className="studentName">{id.Admin_ID} {id.A_Name}</div>
                    <img src={logoutLogo} onClick={logout}/>
                </div>
            </header>
        </>
    )
}

export default HeaderStudent;