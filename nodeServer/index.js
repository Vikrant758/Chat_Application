//Node Server Whichwill handle socket.io connections

const io = require('socket.io')(8000)

const users = {};
io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{
        // console.log('New user', name);
        // If Any Users joins, let others users connected to the server know!!
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })
    // if someone sends the message broadcast it to the other users
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {name: users[socket.id], message: message })
    })
    // if someone leaves the message broadcast it to the other users

    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave',  users[socket.id]);
        delete users[socket.id];
    })
})
