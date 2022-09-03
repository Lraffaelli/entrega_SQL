let socket = io.connect(); 

//productos
const formAddProducto = document.getElementById('formAddProducto')
formAddProducto.addEventListener('submit', e=>{
  e.preventDefault()
  const name= document.getElementById('name')
  const price= document.getElementById('price')
  const picture= document.getElementById('picture')

  const producto = {
    name:name.value,
    price:price.value,
    picture:picture.value,
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

  const mensaje = {autor:inputUsername.value, texto:inputMensaje.value }
  console.log(mensaje)
  
  socket.emit('nuevoMensaje',mensaje)
  mensajesForm.reset()
  inputMensaje.focus()
})

socket.on('nuevoMensaje',mensajes=>{
  console.log(mensajes)
  const html=htmlMensajesList(mensajes)
  document.getElementById('mensajes').innerHTML = html
})

function htmlMensajesList (mensajes){  
  return mensajes.map(mensaje => {    
    return (` 
        <div>
        <b> ${mensaje.autor} </b>
        [<span>${mensaje.fyh}</span>] :
        <i> ${mensaje.texto} </i>
        </div>
    `)
  }).join(" ")
}


inputUsername.addEventListener('input',()=>{
  const user= inputUsername.value.length
  const texto = inputMensaje.value.length
  inputMensaje.disabled = !user
  btnEnviar.disabled = !user || !texto
})

inputMensaje.addEventListener('input', ()=>{
    const texto = inputMensaje.value.length  
  btnEnviar.disabled = !texto
})