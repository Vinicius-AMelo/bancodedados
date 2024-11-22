import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";


export async function GET() {
	try {
		// Conectar ao banco de dados
		await sql.connect(dbConfig);

		// Chamar a stored procedure
		const result = await sql.query`SELECT * from dbo.Clientes`;

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
	try {
		// Parse do corpo da requisição
		const body = await req.json();
		const { nome, cnpj_cpf, endereco, telefone, email } = body;

		// Validação dos dados
		if (
			!nome?.trim() ||
			!cnpj_cpf?.trim() ||
			!endereco?.trim() ||
			!telefone?.trim() ||
			!email?.trim()
		) {
			return NextResponse.json(
				{ error: "Todos os campos são obrigatórios." },
				{ status: 400 }
			);
		}

		// Conectar ao banco de dados
		const pool = await sql.connect(dbConfig);

		// Inserir dados no banco via stored procedure
		await pool.request()
			.input("Nome", sql.NVarChar, nome)
			.input("CNPJ_CPF", sql.NVarChar, cnpj_cpf)
			.input("Endereco", sql.NVarChar, endereco)
			.input("Telefone", sql.NVarChar, telefone)
			.input("Email", sql.NVarChar, email)
			.execute("dbo.sp_InserirCliente");

		// Retornar sucesso
		return NextResponse.json({ message: "Cliente inserido com sucesso!" }, { status: 201 });
	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);

		// Tratar erros conhecidos
		if (error.code === "ESOCKET") {
			return NextResponse.json(
				{ error: "Falha na conexão com o banco de dados." },
				{ status: 500 }
			);
		}

		// Erro genérico
		return NextResponse.json(
			{ error: "Erro interno no servidor." },
			{ status: 500 }
		);
	} finally {
		// Garantir fechamento da conexão
		sql.close();
	}
}
