/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState } from "react";

const PedidoForm = () => {
	const [formData, setFormData] = useState({
		ClienteID: "",
		VendedorID: "",
		DataPedido: "",
	});

	const [message, setMessage] = useState("");

	// Atualiza os valores do formulário
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Envia os dados para a API
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/orders", formData);
			setMessage(response.data.message);
			setFormData({
				ClienteID: "",
				VendedorID: "",
				DataPedido: "",
			});
		} catch (error) {
			console.error("Erro ao inserir pedido:", error);
			setMessage("Erro ao inserir pedido. Tente novamente.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Cadastrar Pedido
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Cliente ID
						</label>
						<input
							type="number"
							name="ClienteID"
							value={formData.ClienteID}
							onChange={handleChange}
							placeholder="Digite o ID do cliente"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Vendedor ID
						</label>
						<input
							type="number"
							name="VendedorID"
							value={formData.VendedorID}
							onChange={handleChange}
							placeholder="Digite o ID do vendedor"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Data do Pedido
						</label>
						<input
							type="date"
							name="DataPedido"
							value={formData.DataPedido}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
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

export default PedidoForm;
