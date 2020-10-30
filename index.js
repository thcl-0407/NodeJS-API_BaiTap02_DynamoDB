const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const dynamoDB = require('./dynamodb.js')
const { ThemSanPham, XoaSanPham } = require('./dynamodb.js')
const app = express()
const upload = multer()

app.use(bodyParser.json())

//Lấy Danh Sách Tất Cả Sản Phẩm
app.get('/', (req, res)=>{
    dynamoDB.GetAllSanPham((error, data)=>{
        if(error){
            res.send(data)
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

    ThemSanPham(data, (result)=>{
        if(result){
            res.send({
                success: 1,
                messeage: "Thêm Thành Công"
            })
        }else{
            res.send({
                success: 0,
                messeage: "Có Lỗi Xảy Ra"
            })
        }
    })
})

//Xoá Sản Phẩm
app.delete('/id=:id&name=:name', (req, res)=>{
    let data = {
        id: req.params.id,
        name: req.params.name,
    }

    XoaSanPham(data, (result)=>{
        if(result){
            res.send({
                success: 1,
                messeage: "Xoá Thành Công"
            })
        }else{
            res.send({
                "success": 0,
                "messeage": "Có Lỗi Xảy Ra"
            })
        }
    })
})

app.listen(3000, ()=>{
    console.log('Running on Port: ' + 3000)
})