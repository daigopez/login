const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')

app.use(express.json())


app.get('/autos', async (req, res) => {
    const autosRef = db.collection('people').doc('associates')
    const doc = await autosRef.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }

    res.status(200).send(doc.data())
})

app.get('/autos/:name', (req, res) => {
    const { name } = req.params
    if (!name || !(name in autos)) {
        return res.sendStatus(404)
    }
    res.status(200).send({ [name]: friends[name] })
})

app.post('/addCar', async (req, res) => {
    const { modelo, marca, color, patente, tipoAuto} = req.body
    const peopleRef = db.collection('autos').doc('idAuto')
    const res2 = await peopleRef.set({
        [modelo]: { marca, 
                    color, 
                    patente, 
                    tipoAuto
                }
    }, { merge: true })
    // friends[name] = status
    res.status(200).send("auto añadido");
})

app.post('/addUser', async (req, res) => {
    const { nombre, apellido, gmail, telefono} = req.body
    const userRef = db.collection('usuario').doc('datos')
    const res2 = await userRef.set({
        [modelo]: { nombre, 
                    apellido, 
                    gmail, 
                    telefono
                }
    }, { merge: true })
    // friends[name] = status
    res.status(200).send("datos añadidos");
})

///app.patch('/changestatus', async (req, res) => {
    //const { name, newStatus } = req.body
    //const peopleRef = db.collection('people').doc('associates')
    //const res2 = await peopleRef.set({
        //[name]: newStatus
    //}, { merge: true })
    // friends[name] = newStatus
   // res.status(200).send(friends)
///})

app.delete('/autos', async (req, res) => {
    const { name } = req.body
    const autosRef = db.collection('autos').doc('idAuto')
    const res2 = await autosRef.update({
        [name]: FieldValue.delete()
    })
    res.status(200).send(friends)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))