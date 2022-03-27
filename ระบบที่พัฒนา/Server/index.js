const express = require('express');
const app = express();
const mysql = require('mysql');
const multer = require('multer')
const cors = require('cors');
const path = require('path')

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "se"
})

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/file/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
});

app.post("/uploadfile", upload.single('file'), (req, res) => { });

//getNisit
app.get("/nisit", (req, res) => {
    db.query("SELECT * FROM nisit", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getNisitId
app.get("/nisitId/:Nisit_ID", (req, res) => {
    const Nisit_ID = req.params.Nisit_ID;
    db.query("SELECT * FROM nisit WHERE Nisit_ID = ? ", Nisit_ID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//getAdmin
app.get("/admin", (req, res) => {
    db.query("SELECT * FROM admin", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getAdmin
app.get("/admin/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM admin WHERE Admin_ID = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getLocationInternship
app.get("/LocationInternship", (req, res) => {
    db.query("SELECT * FROM locationiternship", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//SearchLocationIntern
app.get("/LocationInternshipSearch/:find", (req, res) => {
    const find = '%' + req.params.find + '%';
    db.query("SELECT * FROM locationiternship WHERE Name LIKE ? OR JobTitle LIKE ? OR Amount LIKE ? OR JobDescrip LIKE ?", [find, find, find, find], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getInternshipId
app.get("/LocationInternship/:Id", (req, res) => {
    const Id = req.params.Id;
    db.query("SELECT * FROM locationiternship WHERE Id = ?", Id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//addPetition
app.post('/nisit/addPetition', (req, res) => {
    // console.log(req.file.filename)
    const Name = req.body.Name;
    const Date_Re = req.body.Date_Re;
    const Phone = req.body.Phone;
    const Facebook = req.body.Facebook;
    const LocationShip_ID = req.body.LocationShip_ID;
    const Position_ID = req.body.Position_ID;
    const Location_ID = req.body.Location_ID;
    const Name_LoShip = req.body.Name_LoShip;
    const Posittion_LoShip = req.body.Posittion_LoShip;
    const Collaborator_Name = req.body.Collaborator_Name;
    const Phone_Collab = req.body.Phone_Collab;
    const Email_Collab = req.body.Email_Collab;
    const Date_Start = req.body.Date_Start;
    const Date_End = req.body.Date_End;
    const Add_File = 'http://127.0.0.1:3001/file/' + req.body.Add_File_Name;
    const InternType = req.body.InternType;
    db.query(
        "INSERT INTO request1 (Name, Date_Re, Phone, Facebook, LocationShip_ID, Position_ID , Location_ID, Name_LoShip, Posittion_LoShip, Collaborator_Name, Phone_Collab, Email_Collab, Date_Start, Date_End, Add_File, InternType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [Name, Date_Re, Phone, Facebook, LocationShip_ID, Position_ID, Location_ID, Name_LoShip, Posittion_LoShip, Collaborator_Name, Phone_Collab, Email_Collab, Date_Start, Date_End, Add_File, InternType],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    )
});

//getRequestPetition
app.get("/RequestPetition", (req, res) => {
    db.query("SELECT * FROM request1 ORDER BY Date_Re DESC, Name;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getRequestPetitionStaff
app.get("/RequestPetitionStaff", (req, res) => {
    db.query("SELECT * FROM request1 WHERE Status_re = 'รอการอนุมัติ' ORDER BY Name, Date_Re DESC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getRequestPetition_Id
app.get("/RequestPetition/:Id", (req, res) => {
    const Id = req.params.Id;
    db.query("SELECT * FROM request1 Where Name = ?", Id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getReportFinal_Intern
app.get("/ReportIntern", (req, res) => {
    db.query("SELECT * FROM final_intern", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getReportFinal_Intern_Id
app.get("/ReportIntern/:nisit_ID", (req, res) => {
    const nisit_ID = req.params.nisit_ID;
    db.query("SELECT * FROM final_intern Where nisit_ID = ?", nisit_ID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//deleteLocationInternship
app.delete("/delete/:Id", (req, res) => {
    const Id = req.params.Id;
    db.query("DELETE FROM locationiternship WHERE Id = ?", Id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//UpdateLocationInternship
app.put('/LocationInternship/update', (req, res) => {
    const Id = req.body.Id;
    const Name = req.body.Name;
    const JobTitle = req.body.JobTitle;
    const Amount = req.body.Amount;
    const JobDescrip = req.body.JobDescrip;
    db.query("UPDATE locationiternship SET Name  = ?, JobTitle = ?, Amount = ?, JobDescrip=?  WHERE Id = ?",
        [Name, JobTitle, Amount, JobDescrip, Id], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//addLocationInternship
app.post('/LocationInternship/add', (req, res) => {
    const Name = req.body.Name;
    const JobTitle = req.body.JobTitle;
    const Amount = req.body.Amount;
    const JobDescrip = req.body.JobDescrip;
    db.query(
        "INSERT INTO locationiternship (Name, JobTitle, Amount, JobDescrip) VALUES (?,?,?,?)",
        [Name, JobTitle, Amount, JobDescrip],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    )
});

//UpdateStatusRe
app.put('/status/update', (req, res) => {
    const ID_Re = req.body.ID_Re;
    const Status_re = req.body.Status_re;
    const Descript = req.body.Descript;
    db.query("UPDATE request1 SET Status_re = ?, Descript = ? WHERE ID_Re = ?",
        [Status_re, Descript, ID_Re], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//UpdateStatusCongrat
app.put('/status/update/congrat', (req, res) => {
    const nisit_ID = req.body.nisit_ID;
    const F_Status = req.body.F_Status;
    const F_Descrip = req.body.F_Descrip;
    db.query("UPDATE final_intern SET F_Status = ?, F_Descrip = ? WHERE nisit_ID = ?",
        [F_Status, F_Descrip, nisit_ID], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//UpdateStatusUpfile
app.put('/status/update/upfile', (req, res) => {
    const nisit_ID = req.body.nisit_ID;
    const F_Status = req.body.F_Status;
    const F_Descrip = req.body.F_Descrip;
    const Up_Report = 'http://127.0.0.1:3001/file/' + req.body.Up_Report
    const Up_Report2 = 'http://127.0.0.1:3001/file/' + req.body.Up_Report2
    db.query("UPDATE final_intern SET F_Status = ?, F_Descrip = ?, Up_Report = ?, Up_Report2 = ? WHERE nisit_ID = ?",
        [F_Status, F_Descrip, Up_Report, Up_Report2, nisit_ID], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})


//AddFileStaff
app.post('/staff/addPetition', (req, res) => {
    const nisit_ID = req.body.nisit_ID;
    const Assist_Form = 'http://127.0.0.1:3001/file/' + req.body.Assist_Form;
    const Remit_Form = 'http://127.0.0.1:3001/file/' + req.body.Remit_Form;
    const Date_Report = req.body.Date_Report;
    db.query(
        "INSERT INTO final_intern (nisit_ID, Assist_Form, Remit_Form, Date_Report) VALUES (?,?,?,?)",
        [nisit_ID, Assist_Form, Remit_Form, Date_Report],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    )
});

//SearchRequest
app.get("/RequestSearch/:find", (req, res) => {
    const find = '%' + req.params.find + '%';
    db.query("SELECT * FROM request1 LEFT JOIN nisit ON request1.Name = nisit.Nisit_ID WHERE nisit.NAME LIKE ? OR request1.LocationShip_ID LIKE ? OR request1.Date_Re LIKE ? OR request1.InternType LIKE ? OR request1.Status_re LIKE ?", [find, find, find, find, find], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//SearchFinal_Intern
app.get("/Final_InternSearch/:find", (req, res) => {
    const find = '%' + req.params.find + '%';
    db.query("SELECT * FROM nisit LEFT JOIN final_intern ON nisit.Nisit_ID = final_intern.nisit_ID WHERE nisit.NAME LIKE ? OR final_intern.Date_Report LIKE ? OR final_intern.F_Descrip LIKE ?", [find, find, find], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//addNews
app.post('/news/add', (req, res) => {
    const Title = req.body.Title;
    const Content = req.body.Content;
    const Date_News = req.body.Date_News;
    db.query("INSERT INTO news (Title, Content, Date_News) VALUES (?,?,?)",
        [Title, Content, Date_News],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    )
});

//getNewsAll
app.get("/news/getAll", (req, res) => {
    db.query("SELECT * FROM news ORDER BY News_id DESC;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//getNews_Id
app.get("/news/:News_id", (req, res) => {
    const News_id = req.params.News_id;
    db.query("SELECT * FROM news Where News_id = ?", News_id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


//UpdateNews
app.put('/update/news', (req, res) => {
    const News_id = req.body.News_id;
    const Title = req.body.Title;
    const Content = req.body.Content;
    db.query("UPDATE news SET Title = ?, Content = ? WHERE News_id  = ?",
        [Title, Content, News_id], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//DeleteNews
app.delete("/deletenews/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM news WHERE News_id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//UploadFileStaff
app.post('/staff/upFile', (req, res) => {
    const NameUpFile = req.body.NameUpFile;
    const LinkUpFile = 'http://127.0.0.1:3001/file/' + req.body.NameUpFile;
    db.query(
        "INSERT INTO upfile (NameUpFile, LinkUpFile ) VALUES (?,?)",
        [NameUpFile, LinkUpFile],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("Values inserted");
            }
        }
    )
});

//getAllFile
app.get("/FileUp/getAll", (req, res) => {
    db.query("SELECT * FROM upfile", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//DeleteFile
app.delete("/deleteFile/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM upfile WHERE IdUpFile = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen('3001', () => {
    console.log('Server is running on port 3001');
})