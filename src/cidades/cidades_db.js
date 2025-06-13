const db = require('../../db')

async function buscarCidades(){
    const result = await db.query(`SELECT city, state, country, climate, culture, tourist_att, id FROM "PI"."CDC" order by city`)
    return result.rows
}

async function deletarCidades(event, id){
    console.log('vou deletar')
    const result = await db.query(`DELETE FROM "PI"."CDC" WHERE id = $1`, [id])
    return result.rows
}

async function atualizarCidades(event, pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId) {
    console.log('Dentro de funcao att cidades')
    const result = await db.query(
        `UPDATE "PI"."CDC"
	SET city=$1, state=$2, country=$3, climate=$4, culture=$5, tourist_att=$6
	WHERE id = $7;`,
        [pCidade, pEstado, pPais, pClima, pCultura, pAtracao_t, pId]
    );
    console.log('Fora da funcao att cidades')
    return result.rows
}


async function inserirCidades(event, city, state, country, climate, culture, tourist_att){
    const result = await db.query(`INSERT INTO "PI"."CDC"(
    city, state, country, climate, culture, tourist_att)
	VALUES ($1, $2, $3, $4, $5, $6)`,[city, state, country, climate, culture, tourist_att])
}

module.exports = {
    buscarCidades,
    deletarCidades,
    atualizarCidades,
    inserirCidades
}