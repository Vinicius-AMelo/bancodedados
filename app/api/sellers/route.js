import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";


export async function GET() {
	try {
		// Conectar ao banco de dados
		await sql.connect(dbConfig);

		// Chamar a stored procedure
		const result = await sql.query`SELECT * from dbo.Vendedores`;

		// Retornar os resultados
		return NextResponse.json(result.recordset, { status: 200 });
	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);
		return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
	} finally {
		sql.close();
	}
}

export async function POST(req) {
	const body = await req.json();
	const { Nome, RegiaoID } = body;

	if (!Nome || !RegiaoID) {
		return NextResponse.json(
			{ error: "Todos os campos são obrigatórios." },
			{ status: 400 }
		);
	}

	try {
		await sql.connect(dbConfig);

		// Executa a stored procedure
		await sql.query`
            EXEC dbo.sp_InserirVendedor 
            @Nome=${Nome}, 
            @RegiaoID=${RegiaoID}`;

		return NextResponse.json(
			{ message: "Vendedor cadastrado com sucesso!" },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);
		return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
	} finally {
		sql.close();
	}
}
