const configMySQL ={
    table:'productos',
    table2:'mensajes',
    config: {
        client: 'mysql',
        connection: {
          host: '127.0.0.1',
          port:3306,
          user: 'root',
          password: '',
          database: 'mibase'
        } 
    }
}

const configSGLite ={
    table:'mensajes',
    config:{
        client: 'sqlite3', 
        connection: {
          filename: './DB/mensajes.sqlite'
        },
        useNullAsDefault:true
      }
}

module.exports = {configMySQL, configSGLite}