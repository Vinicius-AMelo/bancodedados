"use client";

import axios from "axios";
import { useState } from "react";

const Home = () => {
	const [formData, setFormData] = useState({
		nome: "",
		cnpj_cpf: "",
		endereco: "",
		telefone: "",
		email: "",
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
			const response = await axios.post("/api/clients", formData);
			setMessage(response.data.message);
			setFormData({
				nome: "",
				cnpj_cpf: "",
				endereco: "",
				telefone: "",
				email: "",
			});
		} catch (error) {
			console.error("Erro ao inserir cliente:", error);
			setMessage("Erro ao inserir cliente. Tente novamente.");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Cadastrar Cliente
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
							// required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							CNPJ/CPF
						</label>
						<input
							type="text"
							name="cnpj_cpf"
							value={formData.cnpj_cpf}
							onChange={handleChange}
							placeholder="Digite o CNPJ ou CPF"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							// required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Endereço
						</label>
						<input
							type="text"
							name="endereco"
							value={formData.endereco}
							onChange={handleChange}
							placeholder="Digite o endereço"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							// required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Telefone
						</label>
						<input
							type="text"
							name="telefone"
							value={formData.telefone}
							onChange={handleChange}
							placeholder="Digite o telefone"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							// required
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Digite o email"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							// required
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

export default Home;
