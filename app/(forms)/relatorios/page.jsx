/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Relatorios = () => {
	const [dados, setDados] = useState([]);
	const [titulo, setTitulo] = useState("Total Vendido por Região");

	const fetchRelatorio = async (type, titulo, params = {}) => {
		try {
			const url = new URL(
				`/api/relatorios?type=${type}`,
				window.location.origin
			);
			Object.keys(params).forEach((key) =>
				url.searchParams.append(key, params[key])
			);

			const response = await axios.get(url.toString());
			setDados(response.data);
			setTitulo(titulo);
		} catch (error) {
			console.error("Erro ao buscar relatório:", error);
		}
	};

	useEffect(() => {
		// Fetch the default report on initial load
		fetchRelatorio("total-vendido-por-regiao", "Total Vendido por Região");
	}, []);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Relatórios</h1>
			<div className="mb-4">
				<button
					onClick={() =>
						fetchRelatorio(
							"total-vendido-por-regiao",
							"Total Vendido por Região"
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
				>
					Total Vendido por Região
				</button>
				<button
					onClick={() =>
						fetchRelatorio(
							"total-vendido-por-cliente",
							"Total Vendido por Cliente"
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
				>
					Total Vendido por Cliente
				</button>
				<button
					onClick={() =>
						fetchRelatorio(
							"total-vendido-por-vendedor",
							"Total Vendido por Vendedor"
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
				>
					Total Vendido por Vendedor
				</button>
				<button
					onClick={() =>
						fetchRelatorio(
							"vendedores-por-regiao",
							"Vendedores por Região",
							{ RegiaoID: 1 }
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
				>
					Vendedores por Região
				</button>
				<button
					onClick={() =>
						fetchRelatorio(
							"clientes-por-regiao",
							"Clientes por Região",
							{ RegiaoID: 1 }
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
				>
					Clientes por Região
				</button>
				<button
					onClick={() =>
						fetchRelatorio(
							"total-vendido-por-produto",
							"Total Vendido por Produto"
						)
					}
					className="px-4 py-2 bg-blue-500 text-white rounded-lg"
				>
					Total Vendido por Produto
				</button>
			</div>
			<h2 className="text-xl font-semibold mb-4">{titulo}</h2>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						{dados.length > 0 &&
							Object.keys(dados[0]).map((key) => (
								<th
									key={key}
									className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
								>
									{key}
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{dados.map((row, index) => (
						<tr key={index}>
							{Object.values(row).map((value, i) => (
								<td
									key={i}
									className="py-2 px-4 border-b border-gray-200"
								>
									{value}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Relatorios;
