const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            nombre: 'John',
            email: 'john@wick.com',
            pass: 'pass',
            entradas: 0,
            ingreso: new Date()
        },

        {
            id: '645',    //a huevo tiene que ir entre comillas o convertirlo a numero
            nombre: 'Gema',
            email: 'gema@wick.com',
            pass: 'pass1',
            entradas: 0,
            ingreso: new Date()
        }
    ]
};

app.get('/', (req, res) => {
    //res.send('esta funcionando');
});

app.post('/signin', (req, res) => {
    console.log('ingresando...');
    console.log(req.body.email, db.users[1].email);
    if(req.body.email === db.users[1].email && req.body.pass === db.users[1].pass){
        res.json('exito');
    }else{
        res.status(400).json('problema al ingresar');
    }
});

app.post('/register', (req, res) => {
    const {email, name, pass} = req.body;
    db.users.push({
        id: 789456,
        nombre: name,
        email: email,
        pass: pass,
        entradas: 0,
        ingreso: new Date()
    })
    res.json(db.users[db.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let encontrado = false;
    db.users.forEach(user => {
        if(user.id === id){
            encontrado = true;
            return res.json(user);
        }
    })
    if(!encontrado){
        res.status(404).json('no existe el usuario');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let encontrado = false;
    db.users.forEach(user => {
        if(user.id === id){
            encontrado = true;
            user.entradas++;
            return res.json(user.entradas);
        }
    })
    if(!encontrado){
        res.status(404).json('no existe el usuario');
    }
})

app.listen(3000, () => {
    console.log('todo bien en el puerto 3000');
})