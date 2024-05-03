var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');
var csv = require('csvtojson');

require('dotenv/config');

var upload = multer({ dest: 'uploads/' });
var sampleMenuModel = require('./model');
var menuModel = require('./menuModel'); 
const Menu = require('./menuModel');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    sampleMenuModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
});

app.post('/', upload.single('file'), (req, res, next) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        var menu = [];
        var menuMap = new Map();
        var SectionName = "";
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            
            //obj.SectionOrder=jsonObj[i]['SectionOrder'];
            //obj.SectionName=jsonObj[i]['SectionName'];
            obj.MenuId=i+1;
            obj.Price=jsonObj[i]['Price'];
            obj.Item=jsonObj[i]['Item'];
            obj.CategoryName=jsonObj[i]['CategoryName'];
            obj.Type=jsonObj[i]['Type'];
            obj.Heighlightdescription=jsonObj[i]['Heighlightdescription'];
            obj.ImageUrl=jsonObj[i]['ImageUrl'];
            obj.OfferHihglight=jsonObj[i]['OfferHihglight'];

            obj.OfferDescription=jsonObj[i]['OfferDescription'];
            obj.ContainerCharge=jsonObj[i]['ContainerCharge'];
            obj.Available=jsonObj[i]['Available'];
            obj.isRecommendedItem=jsonObj[i]['isRecommendedItem'];
            obj.RecommendedImageUrl=jsonObj[i]['RecommendedImageUrl'];
            obj.isVisible=jsonObj[i]['isVisible'];

            console.log("i=>"+i+"SectionName=>"+SectionName+"SectionName_new=>"+jsonObj[i]['SectionName']);

            if(i==0){
                SectionName=jsonObj[i]['SectionName'] ;

            }
            //menuMap.set(SectionName,menu);

            if(jsonObj[i]['SectionName'] != SectionName){
                menuMap.set(SectionName,menu);
                SectionName = jsonObj[i]['SectionName'];
                menu = [];
                menu.push(obj);
            }else{
                menu.push(obj);
            }

        }
        menuMap.set(SectionName,menu);
       /* sampleMenuModel.insertMany(menu).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });*/

        var MenuList=[];
        var MenuListFinal=[];
        var cnt = 0;
        menuMap.forEach((values, keys) => {
            cnt = cnt+1;
            var obj={};
            obj.SectionName = keys;
            obj.SectionOrder = cnt;
            console.log("cnt=>"+cnt);
            //console.log(values, keys);
            obj.MenuItem = values;
            MenuList.push(obj);
        });

        var obj={};
        obj.MenuList=MenuList;
        MenuListFinal.push(obj);


        
        //console.log("MenuList=>"+MenuList.length);
        console.dir(MenuListFinal, { depth:10 });
        

        //console.log("***************");
        //const json = JSON.stringify(MenuListFinal);
        //console.dir(json);
      
       menuModel.insertMany(MenuListFinal).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });

       
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
});

mongoose.connect(process.env.MONGO_URL,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('Connected to database!')
});

app.listen('4200' || process.env.PORT, err => {
    if (err)
        throw err
    console.log('Server started!')
});