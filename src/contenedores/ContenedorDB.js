const knex = require('knex');


class ContenedorDB{
    constructor(config,tabla){
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getAll() {
       try {
            return await this.knex.select().from(this.tabla)        
       } catch (error) {
        throw new Error(`Error al lista ${error}`)
       }
    }

    async getById(id) {
        try {
            return await this.knex.select().from(this.tabla).where('id',id)
        } catch (error) {
            throw new Error(`Error al lista ${error}`)
        }
     
    }    
    async addItem(item){
        try {
            return await this.knex(this.tabla).insert(item)
        } catch (error) {
            throw new Error(`Error al insertar objeto ${error}`)
        }
    }
    
    
    async putItem(newItem, id){
      try {
            return await this.knex(this.tabla).where('id', id).update(newItem)
      } catch (error) {
        throw new Error(`Error al actualizar objeto ${error}`)
      }
    }
    
    async deleteById(id) {
        try {
            return await this.knex(this.tabla).where('id',id).del()
        } catch (error) {
            throw new Error(`Error al eliminar objeto ${error}`)
        }
    }
    
    async deleteAll(){
        try {
            return await this.knex(this.tabla).del()
        } catch (error) {
            throw new Error(`Error al eliminar todo ${error}`)
        }
    }

}
module.exports = ContenedorDB