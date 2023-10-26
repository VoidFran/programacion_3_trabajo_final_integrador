
 // Convocatorias
 app.get("/convocatoria", (req, res) => {
    db.query('SELECT * FROM convocatoria',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/convocatorias_agregar", (req, res) => {
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos

    db.query("INSERT INTO convocatoria(fecha, rival, golesRecibidos, golesConvertidos) VALUES(?, ?, ?, ?)", [fecha, rival, golesRecibidos, golesConvertidos],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/convocatorias_editar", (req, res) => {
    const idConvocatoria = req.body.idConvocatoria
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos
    
    db.query("UPDATE convocatoria SET fecha = ?, rival = ?, golesRecibidos = ?, golesConvertidos = ? WHERE idConvocatoria = ?", [fecha, rival, golesRecibidos, golesConvertidos, idConvocatoria],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/convocatorias_eliminar/:id", (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM convocatoria WHERE idConvocatoria = ?", id,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/rivales", (req, res) => {
    db.query('SELECT * FROM rival WHERE activo = 1',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/rivales_agregar", (req, res) => {
    const nombre = req.body.nombre
    const activo = req.body.activo

    db.query("INSERT INTO rival(nombre, activo) VALUES(?, ?)", [nombre, activo],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/rivales_editar", (req, res) => {
    const idRival = req.body.idRival
    const nombre = req.body.nombre
    const activo = req.body.activo
    
    db.query("UPDATE rival SET nombre = ?, activo = ? WHERE idRival = ?", [nombre, activo, idRival],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/rivales_eliminar/:id", (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM rival WHERE idRival = ?", id,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/convocados", (req, res) => {
    db.query('SELECT * FROM futbolistaconvocatoria WHERE activo = 1',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/convocados_agregar/:id", (req, res) => {
    const convocados_lista = req.body.convocados_lista
    const id = req.params.id

    db.query("INSERT INTO futbolistaconvocatoria(futbolista, convocatoria) VALUES(?, ?)", [convocados_lista, id],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})