// CSS
import "./style/PetitionInternship.css";
// Components
import NavbarStudent from "./ReuseComponents/NavbarStudent";
import HeaderStudent from "./ReuseComponents/HeaderStudent";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Axios from "axios";

function PetitionInternship() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state;

  const [Name, setName] = useState(id.Nisit_ID);
  const [Date_Re, setDate_Re] = useState(new Date().toJSON().slice(0, 10));
  const [Phone, setPhone] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [LocationShip_ID, setLocationShip_ID] = useState(0);
  const [Position_ID, setPosition_ID] = useState("");
  const [Location_ID, setLocation_ID] = useState("");
  const [Name_LoShip, setName_LoShip] = useState("");
  const [Posittion_LoShip, setPosittion_LoShip] = useState("");
  const [Collaborator_Name, setCollaborator_Name] = useState("");
  const [Phone_Collab, setPhone_Collab] = useState("");
  const [Email_Collab, setEmail_Collab] = useState("");
  const [Date_Start, setDate_Start] = useState(new Date());
  const [Date_End, setDate_End] = useState(new Date());
  const [Add_File, setAdd_File] = useState(null);
  const [InternType, setInternType] = useState("");

  const [PetitionList, setPetitionList] = useState([]);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const [Location, setLocation] = useState([]);

    function getLocation() {
        Axios.get(`http://localhost:3001/LocationInternship`).then((response) => {
            setLocation(response.data);
        });
    }
    
    useEffect(() => {
      getLocation();
  }, [])

  const addData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    Axios.post("http://localhost:3001/uploadfile", formData,{
      headers: { "Content-Type": "multipart/form-data" } 
    })

    Axios.post("http://localhost:3001/nisit/addPetition",{
      Name: Name,
      Date_Re: Date_Re,
      Phone: Phone,
      Facebook: Facebook,
      LocationShip_ID: LocationShip_ID,
      Position_ID: Position_ID,
      Location_ID: Location_ID,
      Name_LoShip: Name_LoShip,
      Posittion_LoShip: Posittion_LoShip,
      Collaborator_Name: Collaborator_Name,
      Phone_Collab: Phone_Collab,
      Email_Collab: Email_Collab,
      Date_Start: Date_Start,
      Date_End: Date_End,
      Add_File_Name: fileName,
      InternType: InternType,
    }).then(() => {
      setPetitionList([
        ...PetitionList,
        {
          Name: Name,
          Date_Re: Date_Re,
          Phone: Phone,
          Facebook: Facebook,
          LocationShip_ID: LocationShip_ID,
          Position_ID: Position_ID,
          Location_ID: Location_ID,
          Name_LoShip: Name_LoShip,
          Posittion_LoShip: Posittion_LoShip,
          Collaborator_Name: Collaborator_Name,
          Phone_Collab: Phone_Collab,
          Email_Collab: Email_Collab,
          Date_Start: Date_Start,
          Date_End: Date_End,
          Add_File_Name: fileName,
          InternType: InternType,
        },
      ]);
    });

    navigate('/StudentInternship/ApproveValidation',{ state: {id: id}})
  };

  const AddFileEvent = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  return (
    <>
      <div className="petitionInternshipContainer">
        <NavbarStudent pageNum="2" />
        <section className="petitionInternshipSection">
          <HeaderStudent />
          <div className="information">
            <div className="form">
              <form>
                <div className="title">
                  <h2>ยื่นคำร้องขอการฝึกงาน</h2>
                  <div className="radio">
                    <div>
                      <input type="radio" name="intershipRadio" Value={"ฝึกงาน"}
                        onChange={(event) => { setInternType(event.target.value) }} required />
                      <div>ฝึกงาน</div>
                    </div>
                    <div>
                      <input type="radio" name="intershipRadio" Value={"สหกิจ"}
                        onChange={(event) => { setInternType(event.target.value) }} required />
                      <div>สหกิจศึกษา</div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="input">
                  <div className="leftContainer">
                    <div className="row1">
                      <label>ชื่อ-นามสกุล</label>
                      <div className="nameSurname">
                        <input type="text" name="nameSurname"
                          value={id.NAME} required />
                      </div>
                    </div>
                    <div className="row2">
                      <label>วันที่เขียนคำร้อง</label>
                      <div className="date">
                        <input type="date" name="date"
                          value={Date_Re} required
                        />
                      </div>
                    </div>
                    <div className="row3">
                      <label>เบอร์โทรศัพท์มือถือ</label>
                      <div className="tel">
                        <input type="text" name="tel"
                          onChange={(event) => { setPhone(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row4">
                      <label>Facebook</label>
                      <div className="facebook">
                        <input type="text" name="facebook"
                          onChange={(event) => { setFacebook(event.target.value) }} />
                      </div>
                    </div>
                    <div className="row5">
                      <label>สถานที่ฝึก</label>
                      <div className="place">
                        
                        <input type="text" name="place" list="state_list"
                        
                          onChange={(event) => { setLocationShip_ID(event.target.value) }} required />
                          <datalist id="state_list">
                            {Location.map((data) =>{ return <option value={data.Name}>{data.Name}</option> })}
                          </datalist>               
                      </div>
                      
                    </div>
                    
                    <div className="row6">
                      <label>ตำแหน่งที่ฝึก</label>
                      <div className="position">
                        <input type="text" name="position"
                          onChange={(event) => { setPosition_ID(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row7">
                      <label>ที่อยู่สถานที่ฝึก</label>
                      <div className="placeLocation">
                        <input type="text" name="placeLocation"
                          onChange={(event) => { setLocation_ID(event.target.value) }} required />
                      </div>
                    </div>
                  </div>
                  <div className="rightContainer">
                    <div className="row1">
                      <label>ชื่อของผู้ที่จะให้ภาควิชาออกหนังสือขอความอนุเคราะห์ฝึกงาน/สหกิจ</label>
                      <div className="nameApprove">
                        <input type="text" name="nameApprove"
                          onChange={(event) => { setName_LoShip(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row2">
                      <label>ตำแหน่งของผู้ที่จะให้ภาควิชาออกหนังสือขอความอนุเคราะห์ฝึกงาน</label>
                      <div className="positionApprove">
                        <input type="text" name="positionApprove"
                          onChange={(event) => { setPosittion_LoShip(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row3">
                      <label>ชื่อผู้ประสานงาน</label>
                      <div className="nameCordinate">
                        <input type="text" name="tel"
                          onChange={(event) => { setCollaborator_Name(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row4">
                      <label>โทร</label>
                      <div className="telCordinate">
                        <input type="text" name="telCordinate"
                          onChange={(event) => { setPhone_Collab(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row5">
                      <label>อีเมล</label>
                      <div className="email">
                        <input type="text" name="email"
                          onChange={(event) => { setEmail_Collab(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row6">
                      <label>ระยะฝึกงาน</label>
                      <div className="timeline">
                        <input type="date" name="startTime"
                          onChange={(event) => { setDate_Start(event.target.value) }} required />
                        <div>ถึง</div>
                        <input type="date" name="endTime"
                          onChange={(event) => { setDate_End(event.target.value) }} required />
                      </div>
                    </div>
                    <div className="row7">
                      <label>แนบไฟล์คำร้องขอฝึกงาน/สหกิจศึกษา</label>
                      <div className="file">
                        <input type="file" name="file" 
                            onChange={AddFileEvent} 
                          />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="button">
                  <button className="submit" type="submit" onClick={addData}>ตกลง</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PetitionInternship;
