const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');  

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "itm"
})

app.get('/provice', (req, res) => {
    db.query("SELECT * FROM provinces ORDER BY NameProviceTh", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/provice/:IdProvince', (req, res) => {
    const IdProvince = req.params.IdProvince;
    db.query("SELECT * FROM provinces WHERE IdProvice = ? ORDER BY NameProviceTh", IdProvince, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/districts/:IdProvice', (req, res) => {
    const IdProvice = req.params.IdProvice;
    db.query("SELECT * FROM districts WHERE ProviceDistrict = ? ORDER BY NameDistrictTh", IdProvice, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/subdistricts/:IdDistrict', (req, res) => {
    const IdDistrict = req.params.IdDistrict;
    db.query("SELECT * FROM subdisctricts WHERE districts_id = ? ORDER BY name_thSubDisctict", IdDistrict, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//User
app.post('/user/create', (req, res) => {
    const name = req.body.name;
    const birth = req.body.birth;
    const address = req.body.address;
    const provice = req.body.provice;
    const districts = req.body.districts;
    const subdistricts = req.body.subdistricts;
    const idcard = req.body.idcard;
    const telenum1 = req.body.telenum1;
    const telenum2 = req.body.telenum2;
    const email = req.body.email;
    const password = req.body.password;
    const zipcode = req.body.zipcode;

    db.query(
        "INSERT INTO user (NameSurname, DateOfBirth, Address, ProvincesUser, DistrictUser, SubDistrictsUser, IdCard, Telephone, TelephoneR, Email, Password, zipcode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [name, birth, address, provice, districts, subdistricts, idcard, telenum1, telenum2, email, password, zipcode],
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

app.get('/user/getid/:IdUser', (req, res) => {
    const IdUser = req.params.IdUser;
    db.query("SELECT * FROM user WHERE IdUser = ?", IdUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/user/:username/:password", (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
    db.query("SELECT * FROM user WHERE Email = ? AND Password = ?", [username, password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/user/update', (req, res) => {
    const IdUser = req.body.IdUser;
    const name = req.body.name;
    const birth = req.body.birth;
    const address = req.body.address;
    const provice = req.body.provice;
    const districts = req.body.districts;
    const subdistricts = req.body.subdistricts;
    const idcard = req.body.idcard;
    const telenum1 = req.body.telenum1;
    const telenum2 = req.body.telenum2;
    const email = req.body.email;
    const password = req.body.password;
    const zipcode = req.body.zipcode;
    db.query("UPDATE user SET NameSurname = ?,DateOfBirth = ?,Address = ?,ProvincesUser = ?,DistrictUser = ?,SubDistrictsUser = ?,IdCard = ?,Telephone = ?,TelephoneR = ?,Email = ?,Password = ?,zipcode = ? WHERE IdUser = ?",
        [name, birth, address, provice, districts, subdistricts, idcard, telenum1, telenum2, email, password, zipcode, IdUser], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

app.get('/user', (req, res) => {
    db.query("SELECT * FROM user ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//search
app.get("/search/:IdProvince/:IdDistrict", (req, res) => {
    const IdProvince = req.params.IdProvince;
    const IdDistrict = req.params.IdDistrict;
    db.query("SELECT * FROM vactime WHERE ProvincesHospital = ? AND DistrictHospital = ? ", [IdProvince, IdDistrict], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//StatusUser
app.get("/status", (req, res) => {
    const UserId = req.params.UserId;
    db.query("SELECT * FROM reservevac ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/status/:Idstatus', (req, res) => {
    const Idstatus = req.params.Idstatus;
    db.query("SELECT * FROM reservevac WHERE UserReserve = ?",Idstatus, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//vacData
app.get('/Staff/vacData', (req, res) => {
    db.query("SELECT * FROM vactime ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//ReservVac
app.post('/user/ReserVac', (req, res) => {
    const userVacId = req.body.userVacId;
    const locaVacId = req.body.locaVacId;
    db.query(
        "INSERT INTO reservevac (UserReserve, VacReserve) VALUES (?,?)",
        [userVacId, locaVacId],
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

//Update StatusVac
app.put('/status/update', (req, res) => {
    const IdReserve = req.body.IdReserve;
    const StatusVac = req.body.StatusVac;
    db.query("UPDATE reservevac SET StatusVac = ? WHERE IdReserve = ?",
        [StatusVac,IdReserve], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//Update File
app.put('/File/update', (req, res) => {
    const IdVac = req.body.IdVac;
    const FileDoc  = req.body.FileDoc ;
    db.query("UPDATE vactime SET FileDoc  = ? WHERE IdVac = ?",
        [FileDoc ,IdVac], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

//Delete
app.delete("/delete/:IdReserve", (req, res) => {
    const IdReserve = req.params.IdReserve;
    db.query("DELETE FROM reservevac WHERE IdReserve = ?", IdReserve, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//DeleteLocation
app.delete("/delete/Location/:IdVac", (req, res) => {
    const IdVac = req.params.IdVac;
    db.query("DELETE FROM vactime WHERE IdVac = ?", IdVac, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//addLocation
app.post('/Location/create', (req, res) => {
    const locationName = req.body.locationName;
    const valueVac = req.body.valueVac;
    const dateVac = req.body.dateVac;
    const proviceVac = req.body.proviceVac;
    const districtsVac = req.body.districtsVac;
    db.query(
        "INSERT INTO vactime (LocationVac, ValueVac, DateVac, ProvincesHospital, DistrictHospital) VALUES (?,?,?,?,?)",
        [locationName, valueVac, dateVac, proviceVac, districtsVac],
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

//getAllVac
app.get('/vacLocation', (req, res) => {
    db.query("SELECT * FROM vactime ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//UpdateLocation
app.put('/Location/update', (req, res) => {
    const Id = req.body.Id;
    const LocationVac = req.body.LocationVac;
    const ValueVac = req.body.ValueVac;
    const DateVac = req.body.DateVac;
    const ProvincesHospital = req.body.ProvincesHospital;
    const DistrictHospital  = req.body.DistrictHospital ;
    db.query("UPDATE vactime SET LocationVac = ? ,ValueVac = ? ,DateVac = ? ,ProvincesHospital = ? ,DistrictHospital WHERE IdVac = ?",
        [DistrictHospital ,ProvincesHospital,DateVac,ValueVac,LocationVac,Id], (err, result) => {
            if (err) {
                console.log(err);
            } else
                res.send(result);
        });
})

app.get('/Location/:Id', (req, res) => {
    const Id = req.params.Id;
    db.query("SELECT * FROM vactime WHERE IdVac = ?",Id, (err, result) => {
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