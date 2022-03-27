// CSS
import './App.css';
// Home Components
import Home from './Components/HomeComponents/Home';
import SearchPlace from './Components/HomeComponents/SearchPlace';
import DocumentDownload from './Components/HomeComponents/DocumentDownload';
// Student Components
import HomeInternship from './Components/InternshipComponents/Student/HomeInternship'
import PetitionInternship from './Components/InternshipComponents/Student/PetitionIntership'
import ApproveValidation from './Components/InternshipComponents/Student/ApproveValidation'
import ReportInternship from './Components/InternshipComponents/Student/ReportInternship'
import InternshipValidation from './Components/InternshipComponents/Student/InternshipValidation'
// Staff Components
import Company from './Components/InternshipComponents/Staff/Company'
import CompanyAdd from './Components/InternshipComponents/Staff/CompanyAdd';
import CompanyEdit from './Components/InternshipComponents/Staff/CompanyEdit';
import CompanyDelete from './Components/InternshipComponents/Staff/CompanyDelete';
import PetitionValidation from './Components/InternshipComponents/Staff/PetitionValidation';
import InspectPetition from './Components/InternshipComponents/Staff/InspectPetition';
import DisaprovedPetition from './Components/InternshipComponents/Staff/DisaprovedPetition';
import SummaryApprove from './Components/InternshipComponents/Staff/SummaryApprove';
import AddDocument from './Components/InternshipComponents/Staff/AddDocument';
import CongratuationApprove from './Components/InternshipComponents/Staff/CongratuationApprove';
import InspectCongratuation from './Components/InternshipComponents/Staff/InspectCongratuation';
import DisaprovedCongratuation from './Components/InternshipComponents/Staff/DisapproveCongratuation';
import Announce from './Components/InternshipComponents/Staff/Announce';
import AnnounceEdit from './Components/InternshipComponents/Staff/AnnounceEdit';
import AnnounceDelete from './Components/InternshipComponents/Staff/AnnounceDelete';
import UploadDocument from './Components/InternshipComponents/Staff/UploadDocument'
import UploadDocumentDelete from './Components/InternshipComponents/Staff/UploadDocumentDelete';
// Utils
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (

      <Router>
        <Routes>
          {/* Home */}
          <Route path='/' element={<Home/>}/>
          <Route path='/SearchPlace' element={<SearchPlace/>}/>
          <Route path='/DocumentDownload' element={<DocumentDownload/>}/>
          {/* Student Internship */}
          <Route path='/StudentInternship/HomeInternship' element={<HomeInternship/>}/>
          <Route path='/StudentInternship/PetitionInternship' element={<PetitionInternship/>}/>
          <Route path='/StudentInternship/ApproveValidation' element={<ApproveValidation/>}/>
          <Route path='/StudentInternship/ReportInternship' element={<ReportInternship/>}/>
          <Route path='/StudentInternship/InternshipValidation' element={<InternshipValidation/>}/>
          {/* Staff Internship */}
          <Route path='/StaffInternship/Company' element={<Company/>}/>
          <Route path='/StaffInternship/CompanyAdd' element={<CompanyAdd/>}/>
          <Route path='/StaffInternship/CompanyEdit' element={<CompanyEdit/>}/>
          <Route path='/StaffInternship/CompanyDelete' element={<CompanyDelete/>}/>
          <Route path='/StaffInternship/PetitionValidation' element={<PetitionValidation/>}/>
          <Route path='/StaffInternship/InspectPetition' element={<InspectPetition/>}/>
          <Route path='/StaffInternship/DisaprovedPetition' element={<DisaprovedPetition/>}/>
          <Route path='/StaffInternship/SummaryApprove' element={<SummaryApprove/>}/>
          <Route path='/StaffInternship/AddDocument' element={<AddDocument/>}/>
          <Route path='/StaffInternship/CongratuationApprove' element={<CongratuationApprove/>}/>
          <Route path='/StaffInternship/InspectCongratuation' element={<InspectCongratuation/>}/>
          <Route path='/StaffInternship/DisaprovedCongratuation' element={<DisaprovedCongratuation/>}/>
          <Route path='/StaffInternship/Announce' element={<Announce/>}/>
          <Route path='/StaffInternship/AnnounceEdit' element={<AnnounceEdit/>}/>
          <Route path='/StaffInternship/AnnounceDelete' element={<AnnounceDelete/>}/>
          <Route path='/StaffInternship/UploadDocument' element={<UploadDocument/>}/>
          <Route path='/StaffInternship/UploadDocumentDelete' element={<UploadDocumentDelete/>}/>
        </Routes>
      </Router>

  )
}

export default App;
