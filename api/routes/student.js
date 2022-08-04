const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth, (req, res, next)=>{
    Student.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            Student:result
        })
    })
})

router.get('/getAll',(req,res,next)=>{
    Student.find()
    .then(result=>{
      res.status(200).json({
        studentData:result
      });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

router.get('/find/:id',(req,res,next)=>{
  console.log(req.params.id);
  Student.findById(req.params.id)
  .then(result=>{
    res.status(200).json({
        student:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })
})

router.post('/add',(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    student.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.get('/remove/:id',(req,res,next)=>{
    console.log(req.params.id);

    Student.findById(req.params.id)
    .then(result=>{
        Student.remove(result)
        .then(result=>{
          res.status(200).json({
              message:result
          })
        })
        .catch(err=>{
          console.log(err);
          res.status(500).json({
              error:err
          })
        })  
    })
  })

  router.put('/update/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_student : result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
  })

module.exports = router;