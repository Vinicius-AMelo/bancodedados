import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	let query = '';
	switch (type) {
		case 'total-vendido-por-regiao':
			query = 'EXEC sp_TotalVendidoPorRegiao';
			break;
		case 'total-vendido-por-cliente':
			query = 'EXEC sp_TotalVendidoPorCliente';
			break;
		case 'total-vendido-por-vendedor':
			query = 'EXEC sp_TotalVendidoPorVendedor';
			break;
		case 'vendedores-por-regiao':
			const regiaoID = searchParams.get('RegiaoID');
			if (!regiaoID) {
				return NextResponse.json({ error: "RegiaoID é obrigatório" }, { status: 400 });
			}
			query = `EXEC sp_VendedoresPorRegiao @RegiaoID = ${regiaoID}`;
			break;
		case 'clientes-por-regiao':
			const regiaoIDClientes = searchParams.get('RegiaoID');
			if (!regiaoIDClientes) {
				return NextResponse.json({ error: "RegiaoID é obrigatório" }, { status: 400 });
			}
			query = `EXEC sp_ClientesPorRegiao @RegiaoID = ${regiaoIDClientes}`;
			break;
		case 'total-vendido-por-produto':
			query = 'EXEC sp_TotalVendidoPorProduto';
			break;
		default:
			return NextResponse.json({ error: "Tipo de relatório desconhecido" }, { status: 400 });
	}

	try {
		await sql.connect(dbConfig);
		const result = await sql.query(query);

		// Formatar os valores do recordset se necessário
		const formattedResult = result.recordset.map(row => {
			if (row.TotalVendido) {
				row.TotalVendido = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.TotalVendido);
			}
			return row;
		});

		console.log(formattedResult);

		return NextResponse.json(formattedResult, { status: 200 });
	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);
		return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
	} finally {
		sql.close();
	}
}