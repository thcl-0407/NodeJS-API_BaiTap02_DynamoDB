const aws = require('aws-sdk')
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
            id: data.id,
            name: data.name,
            price: data.price,
            img_src_name: data.img_src_name
        }
    }

    docClient.put(params, (error)=>{
        if(!error){
            callback(true)
        }else{
            callback(false)
        }
    })
}

module.exports = {
    GetAllSanPham, ThemSanPham
}