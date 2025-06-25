const db = require('../../../db')

async function loginValidation(event, login, senha) {
    const result = await db.query(`SELECT login_users, password_users, perfil FROM "PI"."Users" WHERE login_users = $1 AND password_users = $2`, [login, senha])

    if (result.rows.length > 0) {

        return result.rows[0]

    }

    return false
}

module.exports = {
    loginValidation
}