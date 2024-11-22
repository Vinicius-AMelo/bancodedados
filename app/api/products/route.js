import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";


export async function GET() {
	try {
		// Conectar ao banco de dados
		await sql.connect(dbConfig);

		// Chamar a stored procedure
		const result = await sql.query`SELECT * from dbo.Itens`;

		// Retornar os resultados
		return NextResponse.json(result.recordset, { status: 200 });
	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);
		return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
	} finally {
		sql.close();
	}
}