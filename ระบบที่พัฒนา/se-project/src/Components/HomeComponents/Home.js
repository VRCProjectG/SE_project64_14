// CSS
import './style/Home.css';
// Components
import HomeContent from './HomeContent';
import Login from './Login';

function Home(){
    return(
        <div className="homeContainer">

            <Login/>
            <HomeContent/>

        </div>
    )
}

export default Home;