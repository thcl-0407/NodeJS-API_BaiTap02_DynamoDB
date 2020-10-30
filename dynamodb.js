const aws = require('aws-sdk')
const s3 = require('./s3.js')
const table_name = "Products"

//Cấu Hình DynamoDB
aws.config.update({
    region: 'ap-southeast-1',
    endpoint: 'http://dynamodb.ap-southeast-1.amazonaws.com',
    accessKeyId:'AKIAYAEJMCM4ES2CR4ED',
    secretAccessKey:'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'
})

const docClient = new aws.DynamoDB.DocumentClient()

//Lấy Tất Cả Danh Sách Sản Phẩm
function GetAllSanPham(callback){
    let params = {
        TableName: table_name
    }

    docClient.scan(params, (error, data)=>{
        if(!error){
            callback(true, data.Items)
        }else{
            callback(false, null)
        }
    })
}

//Thêm Sản Phẩm
function ThemSanPham(data ,callback){
    let params = {
        TableName: table_name,
        Item:{
            id: Number(data.id),
            name: data.name,
            price: data.price,
            img_src_name: data.img_src_name
        }
    }

    let image = {
        name: data.img_src_name,
        data: data.img_data,
    }

    docClient.put(params, (error)=>{
        if(!error){
            s3.UploadData(image, (status)=>{
                if(status){
                    callback(true)
                }else{
                    callback(false)
                }
            })
        }else{
            callback(false)
        }
    })
}

//Lấy 1 Sản Phẩm
function Get_a_SanPham(data, callback){
    let params = {
        TableName: table_name,
        Key:{
            id: Number(data.id),
            name: String(data.name)
        }
    }

    docClient.get(params, (error, data)=>{
        if(!error && Object.keys(data).length > 0){
            callback(true, data)
        }else{
            callback(false, null)
        }
    })
}

//Xoá Sản Phẩm
function XoaSanPham(data, callback){
    let params = {
        TableName: table_name,
        Key:{
            id: Number(data.id),
            name: String(data.name)
        }
    }

    Get_a_SanPham(data, (err, res)=>{
        if(res){
            let image = {
                name: res.Item.img_src_name
            }

            //Xoá Hình Ảnh Trên S3
            s3.DeleteFile(image, (status)=>{
                console.log(status)
                if(status){
                    //Xoá Dữ Liệu DynamoDB
                    docClient.delete(params, (error)=>{
                        if(!error){
                            callback(true)
                        }else{
                            callback(false)
                        }
                    })
                }else{
                    callback(false)
                }
            })
        }else{
            callback(false)
        }
    })
}

module.exports = {
    GetAllSanPham, ThemSanPham, XoaSanPham
}