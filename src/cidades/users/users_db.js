
const db = require('../../../db')

async function buscarUsers(){
    const result = await db.query(`SELECT id_users, name_users, login_users, password_users, email_users, perfil FROM "PI"."Users" ORDER BY name_users`)
    return result.rows
}

async function deletarUsers(event, id){
    await db.query(`DELETE FROM "PI"."Users" WHERE id_users = $1`, [id])
    return true
}

async function atualizarUsers(event, name, login, password, email, perfil, id){
    await db.query(`
        UPDATE "PI"."Users"
        SET name_users = $1, login_users = $2, password_users = $3, email_users = $4, perfil = $5
        WHERE id_users = $6
    `, [name, login, password, email, perfil, id])
    return true
}

async function inserirUsers(event, name, login, password, email, perfil ){
    await db.query(`
        INSERT INTO "PI"."Users"(name_users, login_users, password_users, email_users, perfil)
        VALUES ($1, $2, $3, $4, $5)
    `, [name, login, password, email, perfil])
    return true
}

module.exports = {
    buscarUsers,
    deletarUsers,
    atualizarUsers,
    inserirUsers
}
