const mClient = require('mongodb').MongoClient
const url='mongodb://localhost:27017'
const database='tempdata'
const assert= require('assert')

let db;

mClient.connect(url,function(err,result){
    if(err){
        assert.equal(null,err)
    }
    else{
        db= result.db(database)
        console.log('Mongodb connection success')
    }

})


module.exports={
    home:(req,res)=>{
        // res.render('index')

        db.collection('tempcoll').find().toArray((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.render('index',{posts:result})
            }

         
        })
    },

    create:(req,res)=>{
        res.render('create')


    },

    newPost:(req,res)=>{
      let val= req.body
      console.log(val)

      db.collection('tempcoll').insertOne(val,(err,result)=>{
          if(err){
              assert.equal(null,err)
          }
          else{
              console.log('Data Insertion Success')
            
          }
      })

      setTimeout(()=>{
          res.redirect('/')
      },5000)
    },


    edit:(req,res)=>{
        let name= req.params.name

        db.collection('tempcoll').find({name}).toArray((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.render('edit',{post:result})
            }
        })

    },

    update:(req,res)=>{
        let name= req.params.name
        let val= req.body

        db.collection('tempcoll').update({name},{
            $set:{
                name:val.name,
                email: val.email,
                company: val.company,
                salary: val.salary,
                description: val.description
               
            }
        },
        (err,result)=>{
            if(err){
                assert.equal(null,err)
            }
            else{
                console.log('Updation Success')
            }
        })

        setTimeout(()=>{
            res.redirect('/')

        },5000)
    },

    delete:(req,res)=>{
        let name=req.params.name

        db.collection('tempcoll').deleteOne({name},(err,result)=>{
            if(err){
                console.log(err)
            }

            else{
                console.log('Deletion success')
            }
        },
        
        setTimeout(()=>{
            res.redirect('/')
        },5000))
    }
}

