const express = require("express");
const bodyParser = require("body-parser");
// const date= require(__dirname+"/date.js");

const { render } = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});

const itemsScema= new mongoose.Schema({
    name: String,
});

const Item= mongoose.model("Item",itemsScema);

const item1= new Item({name:"Brush"});
const item2= new Item({name:"sleep"});
const item3= new Item({name:"jerk"});

const defaultItems=[item1,item2,item3];

const listSchema= new mongoose.Schema({
    name:String,
    items: [itemsScema],//array of items of itemsSchema
});
const List=  mongoose.model("List",listSchema);


app.get("/", function (req, res) {
    // let day= date.getDate();

    Item.find({},(err,foundItems)=>{
        if(foundItems.length==0){
            Item.insertMany(defaultItems,(error)=>{
                if(error)console.log(error);
                else console.log("successfully inserted default items");
            });
            res.redirect("/");
        }
        else{
            res.render("list", {
                listTitile: "Today",
                itemsT: foundItems,
            });            
        }
    })

    

});

app.get("/:customListName",(req,res)=>{
    const customListName= req.params.customListName;
    List.findOne({name:customListName},(err,foundList)=>{
       if(!err){
        if(!foundList){
            const list =new List({
                name: customListName,
                items: defaultItems,
            })
            list.save();
            res.redirect("/"+customListName);
        }
        else{
            res.render("list",{
                listTitile: foundList.name,
                itemsT: foundList.items,
            })
        }
    }
    });

    
 });
app.post("/", function (req, res) {
    let itemName = req.body.todoItem;
    const listname=req.body.List;

    let item= new Item({name:itemName});

    if(listname=="Today"){        
        itemx.save();
        res.redirect("/");
    }
    else{
        List.findOne({name:listname},function(err,foundList){
                foundList.items.push(item);
                foundList.save();
                res.redirect("/"+listname);
        })
    }


    // if (req.body.List === "WorkList") {
    //     workItems.push(item);
    //     res.redirect("/work");
    // }
    // else {
    //     listitems.push(item);
    //     res.redirect("/");
    // }

});
app.post("/delete", function(req,res){
   const checkedItem=req.body.checkedItem;
   const listName=req.body.ListName;

   if(listName=="Today"){
    Item.findByIdAndRemove(checkedItem,(err)=>{
        if(err) console.log(err);
        else console.log("Successfully deleted");        
        res.redirect("/");
    });
   }
   else{
       List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItem}}},(err,founsList)=>{
           if(!err){
           res.redirect("/"+listName); 
           }          
       })      
   }
  
});
// app.get("/work", (req, res) => {
//     res.render("list", {
//         listTitile: "WorkList",
//         itemsT: workItems,
//     })
// });
app.get("/about",(req,res)=>{
    res.render("about");
})


app.listen(3000, function (req, res) {
    console.log("localhost:3000");
});







/*var cuurentDay = today.getDay();//getDaygets the day as numbers 0 as sunday 6 as saturday etc
    switch (cuurentDay) {
        case 0: day = "Sunday";
            break;
        case 1: day = "Monday";
            break;
            case 2: day = "Tuesday";
            break;
            case 3: day = "Wednesday";
            break;
            case 4: day = "Thursay";
            break;
            case 5: day = "Friay";
            break;
            default: day="Saturday";
            break;
    }
     res.render("list", { dayT: day });
*/