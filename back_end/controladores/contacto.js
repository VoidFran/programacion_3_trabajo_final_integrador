// envio de correo electrónicos
const nodemailer = require("nodemailer");

// Contacto
exports.enviar_correo = async (req, res)=> {
    const {titulo, correo, mensaje} = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    const cuerpo = `<body style= "background-color: #155fd9">
	                    <h1 style="color: #f1c40f; font-size: 16px; margin: 16px">${titulo}</h1>
	                        <p style="color: #ffffff; font-size: 16px; margin: 16px">${mensaje}</p>
	                        <footer><p style="color: #ffffff; font-size: 16px; margin: 16px">Copyright© 2023 AFA / Todos los derechos reservados</p></footer>
                    </body>`;

    const opciones = {
        from : "api prog3",
        to: correo,
        subject: titulo,
        html: cuerpo
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            console.log("error -> ", error)
            const respuesta = 'correo no enviado'
            res.json({respuesta})
        }else{
            console.log(info)
            const respuesta = "correo enviado"
            res.json({respuesta})
        }
    })
}