const aws = require('aws-sdk')
const bucket_name = "thcloc"

//Cấu Hình S3
const s3Client = new aws.S3({
    endpoint: 'http://s3.ap-southeast-1.amazonaws.com',
    accessKeyId:'AKIAYAEJMCM4ES2CR4ED',
    secretAccessKey:'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',
    Bucket: bucket_name
})

function UploadData(image, callback){
    let params = {
        Bucket: bucket_name,
        Key: image.name,
        Body: image.data
      }
    
    s3Client.upload(params, (error, data)=>{
        if(error){
            callback(false)
        }else{
            if(data){
                callback(true)
            }else{
                callback(false)
            }
        }
    })
}

function DeleteFile(image, callback){
    let params = {
        Bucket: bucket_name,
        Key: image.name,
    }

    s3Client.deleteObject(params, (error, data)=>{
        if(error){
            callback(false)
        }else{
            if(data){
                callback(true)
            }else{
                callback(false)
            }
        }
    })
}

module.exports = {
    UploadData, DeleteFile
}