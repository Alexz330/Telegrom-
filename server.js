const express = require('express');
const app = express();

const server  = require('http').Server(app)
const cors =  require('cors')
const router = require('./network/routes')
const socket =  require('./socket')
const db =  require('./db')
const port  =  3000

db(`mongodb+srv://admin:admin123@cluster0.du0f9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server)
router(app)

app.use('/app', express.static('public'))

server.listen(port, () => {
    console.log('el servidor esta en el puerto '+port)
})
