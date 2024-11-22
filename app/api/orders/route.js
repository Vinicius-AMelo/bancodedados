import sql from "mssql";
import { NextResponse } from "next/server";
import { dbConfig } from "../../utils/db_config";

export async function POST(req) {
	const body = await req.json();
	const { ClienteID, VendedorID, DataPedido, Itens } = body;

	if (!ClienteID || !VendedorID || !DataPedido || !Itens || Itens.length === 0) {
		return NextResponse.json(
			{ error: "Todos os campos são obrigatórios, incluindo itens do pedido." },
			{ status: 400 }
		);
	}

	try {
		await sql.connect(dbConfig);

		const itemsTable = new sql.Table('TipoItensPedido3');
		itemsTable.columns.add('ItemID', sql.Int);
		itemsTable.columns.add('Quantidade', sql.Int);

		Itens.forEach(item => {
			itemsTable.rows.add(item.ItemID, item.Quantidade);
		});

		await sql.query`
            EXEC dbo.sp_InserirPedido 
                @ClienteID=${ClienteID}, 
                @VendedorID=${VendedorID}, 
                @DataPedido=${DataPedido}, 
                @Itens=${itemsTable}
        `;

		return NextResponse.json(
			{ message: "Pedido inserido com sucesso!" },
			{ status: 201 }
		);

	} catch (error) {
		console.error("Erro ao chamar a stored procedure:", error);
		return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
	} finally {
		sql.close();
	}
}