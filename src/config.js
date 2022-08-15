const configMySQL ={
    table:'productos',
    config: {
        client: 'mysql',
        connection: {
          host: '127.0.0.1',
          port:3306,
          user: 'root',
          password: '',
          database: 'ecommerce'
        } 
    }
}

const configSGLite ={
    table:'mensajes',
    config:{
        client: 'sqlite3', 
        connection: {
          filename: "./DB/mensajes.sqlite"
        },
        useNullAsDefault:true
      }
}

module.exports = {configMySQL, configSGLite}