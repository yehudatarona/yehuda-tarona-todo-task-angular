const mongoose = require('mongoose');
const Joi = require("@hapi/joi")


//creating  the for schema of our collection
let tasksSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
     
      category: {
        type:String,
        required:true,
        minLength:2,
        maxLength:99
      },
     
      date:{type:Date,default:Date.now()}
})

//connecting the schema above to the Collection in db
exports.tasksModel = mongoose.model("tasks",tasksSchema);


const validTask = (_task) => {

    let JoiSchema = Joi.object({
      id:Joi.string(),
      name:Joi.string().min(2).max(99).required(),
      category:Joi.string().min(2).max(99).required()
     
    })
  
    return JoiSchema.validate(_task);
  }
  
  exports.validTask = validTask;



