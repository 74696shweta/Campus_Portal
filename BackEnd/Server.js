const express = require('express') 
const bodyParser = require('body-parser')
const app   = express()
const PORT  = 9800;
const db  = require('./DB/db.js')
const Route =  require('./Routes/AdminRoutes')
const studentRoute =  require('./Routes/StudentRoutes')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');

app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24
    }
}))

app.use( '/static' , express.static(path. join(__dirname , 'uploads')))

app.use('/admin' ,Route)
app.use('/student',studentRoute)

app.listen(PORT,()=>{
    console.log(`Server is runnig on PORT : ${PORT}`)
})
