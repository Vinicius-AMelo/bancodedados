import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";

export async function GET() {
	try {
		await sql.connect(dbConfig);

		// Consulta todas as regiões
		const result = await sql.query`
            SELECT RegiaoID, Nome FROM Regioes
        `;

		// Retorna as regiões no formato desejado
		return NextResponse.json(result.recordset, { status: 200 });
	} catch (error) {
		console.error("Erro ao consultar as regiões:", error);
		return NextResponse.json({ error: "Erro ao buscar as regiões." }, { status: 500 });
	} finally {
		sql.close();
	}
}
