// CSS
import './style/HeaderStudent.css';
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
            <header className="studentHeaderContainer">
                <div className="titleHead">ระบบการฝึกงาน มหาวิทยาลัยเกษตรศาสตร์</div>
                <div className='nameBox'>
                    <div className="studentName">{id.Nisit_ID} {id.NAME}</div>
                    <img src={logoutLogo} onClick={logout}/>
                </div>
            </header>
        </>
    )
}

export default HeaderStudent;