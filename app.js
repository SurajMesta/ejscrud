const express=require('express')
const app= express()
const router= require('./router/router')
const bodyParser= require('body-parser')
const PORT= Number(process.env.PORT || 5500)

app.set('views','./views')
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router)

app.listen(PORT,()=>{
    console.log(`Server is up and running at PORT ${PORT}`)
})






