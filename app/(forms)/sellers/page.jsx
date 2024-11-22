/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const CadastrarVendedor = () => {
	const [formData, setFormData] = useState({
		nome: "",
		regiaoID: "",
	});
	const [regioes, setRegioes] = useState([]);
	const [message, setMessage] = useState("");

	// Carrega as regiões ao montar o componente
	useEffect(() => {
		const fetchRegioes = async () => {
			try {
				const response = await axios.get("/api/regions");
				setRegioes(response.data);
			} catch (error) {
				console.error("Erro ao carregar as regiões:", error);
				setMessage("Erro ao carregar as regiões. Tente novamente.");
			}
		};

		fetchRegioes();
	}, []);

	// Atualiza os valores do formulário
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Envia os dados para a API
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/sellers", {
				Nome: formData.nome,
				RegiaoID: parseInt(formData.regiaoID, 10),
			});
			setMessage(response.data.message);
			setFormData({
				nome: "",
				regiaoID: "",
			});
		} catch (error) {
			console.error("Erro ao cadastrar vendedor:", error);
			setMessage("Erro ao cadastrar vendedor. Tente novamente.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Cadastrar Vendedor
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Nome
						</label>
						<input
							type="text"
							name="nome"
							value={formData.nome}
							onChange={handleChange}
							placeholder="Digite o nome"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Região
						</label>
						<select
							name="regiaoID"
							value={formData.regiaoID}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						>
							<option value="">Selecione a Região</option>
							{regioes.map((regiao) => (
								<option
									key={regiao.RegiaoID}
									value={regiao.RegiaoID}
								>
									{regiao.Nome}
								</option>
							))}
						</select>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Cadastrar
					</button>
				</form>
				{message && (
					<p className="mt-4 text-center text-green-600 font-medium">
						{message}
					</p>
				)}
			</div>
		</div>
	);
};

export default CadastrarVendedor;
