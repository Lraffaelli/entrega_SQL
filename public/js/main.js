let socket = io.connect(); 

//productos
const formAddProducto = document.getElementById('formAddProducto')
formAddProducto.addEventListener('submit', e=>{
  e.preventDefault()
  const producto = {
    name:formAddProducto[0].value,
    price:formAddProducto[1].value,
    picture:formAddProducto[2].value,
  }
  socket.emit('update',producto);
  formAddProducto.reset()
})

socket.on('productos', productos=>{
  makeHtmlTable(productos).then(html =>{
    document.getElementById('productos').innerHTML=html
  })
})

function makeHtmlTable(productos){
  return fetch('../parcials/productos.hbs')
  .then(respuesta => respuesta.text())
  .then(plantilla => {
    const template = Handlebars.compile(plantilla)
    const html = template({productos})
    return html
  })
}
//-----------------------------------------------------------------------------------------

const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('texto')
const btnEnviar = document.getElementById('btnEnviar')

const mensajesForm = document.getElementById('mensajesForm')

mensajesForm.addEventListener('submit', e=>{
  e.preventDefault()

  const mensaje = {
    autor:inputUsername.value,
    texto:inputMensaje.value
  }
  
  socket.emit('newMensaje',mensaje)
  mensajesForm.reset()
  inputMensaje.focus()
})
console.log(mensaje)

socket.on('mensajes', mensajes=>{
  const html = makeHtmlList(mensajes)
  document.getElementById('mensajes').innerHTML=html
});

function makeHtmlList(mensajes){
  return mensajes.map(mensaje=>{
    return(` 
        <div>
            <span> ${mensaje.autor} </span>
            <p> ${mensaje.texto} </p>
        </div>
    `)
  }).join(" ")
}

inputUsername.addEventListener('input', ()=>{
  const user= inputUsername.value.length
  const texto = inputMensaje.value.length
  inputMensaje.disabled = !user
  btnEnviar.disabled = !user || !texto
})

inputmensaje.addEventListener('input', ()=>{
    const texto = inputMensaje.value.length  
  btnEnviar.disabled = !user || !texto
})