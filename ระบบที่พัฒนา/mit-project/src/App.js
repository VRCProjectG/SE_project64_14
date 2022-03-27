// CSS
import './App.css';
// Home Components
import Home from './Components/HomeComponents/Home';
// Register Components
import Register from './Components/RegisterComponents/Register';
// Citizen Reservation Components
import StatusCheck from './Components/ReservationComponents/Citizen/StatusCheck';
import VaccineReservation from './Components/ReservationComponents/Citizen/VaccineReservation';
import DocumentDownload from './Components/ReservationComponents/Citizen/DocumentDownload';
import EditCitizenUser from './Components/ReservationComponents/Citizen/EditCitizenUser';
// Staff Reservation Components
import VaccinePlace from './Components/ReservationComponents/Staff/VaccinePlace';
import ReservationCheck from './Components/ReservationComponents/Staff/ReservationCheck';
import ApproveDocument from './Components/ReservationComponents/Staff/ApproveDocument';
import EditStaffUser from './Components/ReservationComponents/Staff/EditStaffUser';
import AddVaccinePlace from './Components/ReservationComponents/Staff/AddVaccinePlace';
import DeleteVaccinePlace from './Components/ReservationComponents/Staff/DeleteVaccinePlace';
// Utils
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (

      <Router>
        <Routes>
          {/* Home */}
          <Route path='/' element={<Home/>}/>
          {/* Register */}
          <Route path='/Register' element={<Register/>}/>
          {/* Citizen Reservation */}
          <Route path='/Reservation/StatusCheck' element={<StatusCheck/>}/>
          <Route path='/Reservation/VaccineReservation' element={<VaccineReservation/>}/>
          <Route path='/Reservation/DocumentDownload' element={<DocumentDownload/>}/>
          <Route path='/Reservation/EditCitizenUser' element={<EditCitizenUser/>}/>
          {/* Staff Reservation */}
          <Route path='/Reservation/VaccinePlace' element={<VaccinePlace/>}/>
          <Route path='/Reservation/ReservationCheck' element={<ReservationCheck/>}/>
          <Route path='/Reservation/ApproveDocument' element={<ApproveDocument/>}/>
          <Route path='/Reservation/EditStaffUser' element={<EditStaffUser/>}/>
          <Route path='/Reservation/AddVaccinePlace' element={<AddVaccinePlace/>}/>
          <Route path='/Reservation/DeleteVaccinePlace' element={<DeleteVaccinePlace/>}/>
        </Routes>
      </Router>

  )
}

export default App;
