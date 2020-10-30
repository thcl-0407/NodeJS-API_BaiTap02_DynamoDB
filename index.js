const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const dynamoDB = require('./dynamodb.js')
const app = express()
const upload = multer()

app.use(bodyParser.json())

//Lấy Danh Sách Tất Cả Sản Phẩm
app.get('/', (req, res)=>{
    dynamoDB.GetAllSanPham((error, data)=>{
        if(error){
            res.send(da2ta)
        }
    })
})

//Thêm Sản Phẩm
app.post('/add', upload.single('image'), (req, res)=>{
    let data = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        img_src_name: Date.now() + req.file.originalname,
        img_data: req.file.buffer
    }

    console.log(data)
})

app.listen(3000, ()=>{
    console.log('Running on Port: ' + 3000)
})