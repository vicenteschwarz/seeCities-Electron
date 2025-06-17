
const db = require('../../../db')

async function buscarDevs(){
    const result = await db.query(`SELECT id_devs, name_devs, login_devs, password_devs, email_devs FROM "PI"."Devs" ORDER BY name_devs`)
    return result.rows
}

async function deletarDevs(event, id){
    console.log('Deletando dev:', id)
    await db.query(`DELETE FROM "PI"."Devs" WHERE id_devs = $1`, [id])
    return true
}

async function atualizarDevs(event, name, login, password, email, id){
    await db.query(`
        UPDATE "PI"."Devs"
        SET name_devs = $1, login_devs = $2, password_devs = $3, email_devs = $4
        WHERE id_devs = $5
    `, [name, login, password, email, id])
    return true
}

async function inserirDevs(event, name, login, password, email){
    await db.query(`
        INSERT INTO "PI"."Devs"(name_devs, login_devs, password_devs, email_devs)
        VALUES ($1, $2, $3, $4)
    `, [name, login, password, email])
    return true
}

module.exports = {
    buscarDevs,
    deletarDevs,
    atualizarDevs,
    inserirDevs
}
