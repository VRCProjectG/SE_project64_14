// CSS
import './style/Home.css';
// Components
import SearchPlace from './SearchPlace';
import Login from './Login';

function Home(){
    return(
        <div className="homeContainer">

            <SearchPlace/>
            <Login/>

        </div>
    )
}

export default Home;