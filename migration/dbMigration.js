const knex = require('knex');
const{configMySQL, configSGLite}=require('../src/config')

try {
    const clientDB = knex(configMySQL.config)
    await clientDB.schema.dropTableIfExist(configMySQL.table)

    await clientDB.schema.createTable(configMySQL.table, table=>{
        table.increment('id').primary(),
        table.string('name'),
        table.string('price'),
        table.string('picture')
    })

    await clientDB.destroy()

    console.log('Se creo la tabla de productos')
} catch (error) {
    
}
try {
    const clientDB= knex(configSGLite.config)
    await clientDB.schema.dropTableIfExist(configSGLite.table)

    await clientDB.schema.createTable(configSGLite.table, table=>{
        table.increment('id').primary(),
        table.string('autor'),
        table.string('texto'),
        table.string('fyh')
    })

    await clientDB.destroy()

    console.log('Se creo la tabla de mensajes')

} catch (error) {
    console.log('Error al crear tabla de mensajes')
    console.log(error)
}

module.exports= migration