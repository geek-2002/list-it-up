var express = require('express');
var bodyParser=require('body-parser');
const mongoose=require('mongoose');
var http=require('http');
var app = express();
var items=[];
 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'html');
 app.set('views', __dirname);
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static("public"));
 mongoose.connect('mongodb+srv://sankirtana_02:chiaroscurist@cluster0-2n9ll.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDb connected"))
 .catch(err => console.log(err));
const itemsSchema = {
  name:String
};
const Item = mongoose.model("Item",itemsSchema);
  const item1 = new Item({
     name : "welcome to your to do list"
});
  const item2 = new Item({
     name:" + button to add a "
});
  const item3 = new Item({
    name:"<-- button to delete "
});
const defaultItems = [item1,item2,item3];
/*Item.insertMany(defaultItems,function(err){
   if(err){
     console.log(err);
   }
   else{
     console.log("inserted documents");
   }
});*/
  app.get('/', function(req, res){
    Item.find({},function(err,founditems){
      if(founditems.length === 0){
    Item.insertMany(defaultItems,function(err){
      if(err){
       console.log(err);
      }
      else{
       console.log("inserted documents");
   }
});
  res.redirect("/");
  }
     else{
       res.render("index",{kindOfDay:day,newListItems:founditems});
    }
  });
var today=new Date();
var options = { 
   weekday: 'long',
   year: 'numeric',
   month: 'long', 
   day: 'numeric'
};
var day= today.toLocaleDateString("en-US",options);
  app.post("/",function(req,res){
   const itemName=req.body.newItem;
   const item = new Item({
     name: itemName 
   });
   item.save();
   res.redirect("/");
  });
  app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId,function(err){
      if(!err){
          console.log("successfully deleted the item");
          res.redirect("/");
      }
    });
  });
  });
   let port = process.env.PORT;
     if (port == null || port == "") {
        port = 1000;
    }
     app.listen(port,function(req,res){
      console.log("server running on port 1000");
     })
