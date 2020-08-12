const express = require('express');
const router = express.Router();
const { tasksModel,validTask} = require("../models/toDo_model")

// testing connection to db for fun
tasksModel.find({})
    .then(data => {
        console.log("then", data);
    })
    .catch(err => {
        console.log(err);
    })

/* GET home page. */
// all tasks in the db domain/todo

router.get('/', (req, res, next) => {
  tasksModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
});

// search query domain/todo/search/?s=<searched item>

router.get("/search/",(req,res) => {
    const mySearch = new RegExp(`${req.query.s}`);
    tasksModel.find({$or:[{name:mySearch},{category:mySearch}]})
    .then(data => {
      res.json(data)
    })
  })

// In the below query string we decide how many tasks will display in one page ( limit per page and also the sort order)
  router.get('/limit/:pageNum', (req, res) => {
    let perPage = Number(req.query.perPage) || 4;
   
    // limit -> the max amount to be display on apage
    // SKIP -> how many to skip and display then rest.
    tasksModel.find({})
    .limit(perPage)
    .skip(req.params.pageNum * perPage)
    .sort({_id:-1})
    .then(data => {
      res.json(data)
    })
  });


 // to get the amount of tasks all in the db

  router.get('/countTasks',(req,res) => {
    tasksModel.countDocuments({})
    .then(data => {
      res.json({doucuments:data})
    })
  })
  

 
  // to get the amount of tasks in categoery
  
router.get("/catCount/:catId",(req,res) => {
    let catId = req.params.catId;
    tasksModel.countDocuments({category:catId})
    .then(data => {
      res.json({doucuments:data})
    })
  })

   // filter out tasks by category for the  db domain/todo/cat/<cat name>
  router.get("/cat/:catId",(req,res) => {
    let catId = req.params.catId;
    let pageNum = req.query.pageNum || 0;
    let perPage = Number(req.query.perPage) || 5;
    tasksModel.find({category:catId})
    .skip(pageNum * perPage)
    .limit(perPage)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err)
    })
  })


router.get('/single/:id', (req, res, next) => {

  tasksModel.findOne({_id:req.params.id})
    .then(data => {
      res.json(data)
      
    })
    .catch(err => {
      res.status(400).json(err)
    })
  });


 
  router.post("/add",async(req,res) => {
    let dataBody = req.body;
    let toy = await (dataBody);
    if(toy.error){
      res.status(400).json(toy.error.details[0])
    }
    else{
      try{
        let updateData = await tasksModel.insertMany([req.body]);
        res.json(updateData)
        
      }
      catch(err){
        console.log(err);
        res.status(400).json({ message: "error insert new toy, already in data" })
      }
    }
  })

  router.post("/edit",async(req,res) => {
    let dataBody = req.body;
    let toy = await (dataBody);
    if(toy.error){
      res.status(400).json(toy.error.details[0])
    }
    else{
      try{
        let updateData = await tasksModel.updateOne({_id:req.body.id},req.body);
        res.json(updateData)
        
      }
      catch{
        res.status(400).json({ message: "error cant find id" })
      }
    }
  })

  router.post("/del",(req,res) => {
    let delId = req.body.del
    tasksModel.deleteOne({_id:delId})
    .then(data => {
      if(data.deletedCount > 0 ){
        res.json({message:"deleted"});
      }
      else{
        res.status(400).json({error:"error id not found"});
      }
    })
  })

  router.post("/clearAll", (req,res) =>
  {
    tasksModel.deleteMany({})
      .then(data =>
      {
          if(data.deletedCount >= 0 )
          {
              res.json({message:"clear All List (empty collection tasks)"});
          }
          else
          {
              res.status(400).json({error:"Error clear All Not Working "});
          }
      })
  })
 
module.exports = router;
