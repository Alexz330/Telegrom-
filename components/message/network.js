const express = require("express");

const response = require('../../network/response')
const router = express.Router();
const controller = require('./controller')

const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination : "public/files/",
    filename : function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    const filterMessage =  req.query.user || null
    
    controller.getMessage(filterMessage)
    .then((messegeList)=>{
        response.success(req,res,messegeList,200)
    })
    .catch(e =>{
        response.error(req,res,'Unexpected error',500,e)
    })
})

router.post("/", upload.single('file'),(req, res) => {
    controller.addMessage(req.body.chat,req.body.user,req.body.message,req.file)

        .then((fullMessage)=>{
            response.success(req, res, fullMessage, 201)
        })
        .catch(e =>{
            response.error(req, res, "Informacion invalida", 500,e)
        })
   
       
   
       
})


router.patch('/:id', (req,res)=>{
    console.log(req.params.id)
    controller.updateMessage(req.params.id,req.body.message)
        .then(data =>{
            response.success(req, res,data,200)
        })
        .catch(e=>{
            response.error(req,res,"Error Interno", 500, e)
        })
    
})


router.delete('/:id',(req,res)=>{
    controller.deleteMessage(req.params.id)
        .then(()=>{
            response.success(req,res,`Message ${req.params.id} eliminado` )
        })
        .catch(e=>{
            response.error(req, res, "Error Interno", 500, e)
        })
})      
module.exports = router;