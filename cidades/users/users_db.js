
const db = require('../../../db')

async function buscarUsers(){
    const result = await db.query(`SELECT id_users, name_users, login_users, password_users, email_users FROM "PI"."Users" ORDER BY name_users`)
    return result.rows
}

async function deletarUsers(event, id){
    await db.query(`DELETE FROM "PI"."Users" WHERE id_users = $1`, [id])
    return true
}

async function atualizarUsers(event, name, login, password, email, id){
    await db.query(`
        UPDATE "PI"."Users"
        SET name_users = $1, login_users = $2, password_users = $3, email_users = $4
        WHERE id_users = $5
    `, [name, login, password, email, id])
    return true
}

async function inserirUsers(event, name, login, password, email, role){
    await db.query(`
        INSERT INTO "PI"."Users"(name_users, login_users, password_users, email_users)
        VALUES ($1, $2, $3, $4)
    `, [name, login, password, email,])
    return true
}

module.exports = {
    buscarUsers,
    deletarUsers,
    atualizarUsers,
    inserirUsers
}
