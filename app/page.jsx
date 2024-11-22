/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const CadastrarPedido = () => {
	const [formData, setFormData] = useState({
		clienteID: "",
		vendedorID: "",
		dataPedido: "",
		valorPedido: "",
	});
	const [produtos, setProdutos] = useState([]);
	const [clientes, setClientes] = useState([]);
	const [vendedores, setVendedores] = useState([]);
	const [itensPedido, setItensPedido] = useState([]); // Lista de itens no pedido
	const [message, setMessage] = useState("");
	const [produtoSelecionado, setProdutoSelecionado] = useState("");
	const [quantidade, setQuantidade] = useState(1); // Quantidade do produto
	const [valorPedido, setValorPedido] = useState(0);

	// Carrega clientes, vendedores e produtos ao montar o componente
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [clientesResponse, vendedoresResponse, produtosResponse] =
					await Promise.all([
						axios.get("/api/clients"),
						axios.get("/api/sellers"),
						axios.get("/api/products"), // Supondo que você tem uma API para os produtos
					]);
				setClientes(clientesResponse.data);
				setVendedores(vendedoresResponse.data);
				setProdutos(produtosResponse.data);
			} catch (error) {
				console.error("Erro ao carregar dados:", error);
				setMessage("Erro ao carregar os dados. Tente novamente.");
			}
		};

		fetchData();
	}, []);

	// Atualiza os valores do formulário
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Adiciona um produto à lista de itens do pedido
	const adicionarProduto = () => {
		if (produtoSelecionado) {
			const produto = produtos.find(
				(produto) => produto.ItemID === parseInt(produtoSelecionado)
			);
			const novoItem = {
				ItemID: produto.ItemID,
				NomeProduto: produto.NomeProduto,
				PrecoUnitario: produto.PrecoUnitario,
				Quantidade: quantidade, // Adiciona a quantidade
			};
			setItensPedido((prevItens) => [...prevItens, novoItem]);
			setProdutoSelecionado(""); // Reseta o select
			setQuantidade(1); // Reseta a quantidade
		}
	};

	// Remove um item da lista de itens do pedido
	const removerItem = (index) => {
		setItensPedido((prevItens) => prevItens.filter((_, i) => i !== index));
	};

	// Envia os dados para a API
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/orders", {
				ClienteID: parseInt(formData.clienteID, 10),
				VendedorID: parseInt(formData.vendedorID, 10),
				DataPedido: formData.dataPedido,
				Itens: itensPedido.map((item) => ({
					ItemID: item.ItemID,
					Quantidade: item.Quantidade,
				})),
			});
			setMessage(response.data.message);
			setFormData({
				clienteID: "",
				vendedorID: "",
				dataPedido: "",
				valorPedido: "",
			});
			setItensPedido([]);
		} catch (error) {
			console.error("Erro ao cadastrar pedido:", error);
			setMessage("Erro ao cadastrar pedido. Tente novamente.");
		}
	};

	useEffect(() => {
		const totalPedido = itensPedido.reduce(
			(acc, item) => acc + item.PrecoUnitario * item.Quantidade,
			0
		);
		setValorPedido(totalPedido);
	}, [itensPedido]);

	return (
		<div className="flex justify-center items-center min-h-[100vh]">
			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg  w-[500px]"
			>
				<h2 className="text-2xl font-semibold mb-6">
					Cadastrar Pedido
				</h2>

				<div className="mb-6">
					<label className="block text-gray-800 font-medium">
						Cliente
					</label>
					<select
						name="clienteID"
						value={formData.clienteID}
						onChange={handleChange}
						className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						<option value="">Selecione o Cliente</option>
						{clientes.map((cliente) => (
							<option
								key={cliente.ClienteID}
								value={cliente.ClienteID}
							>
								{cliente.Nome}
							</option>
						))}
					</select>
				</div>

				<div className="mb-6">
					<label className="block text-gray-800 font-medium">
						Vendedor
					</label>
					<select
						name="vendedorID"
						value={formData.vendedorID}
						onChange={handleChange}
						className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						<option value="">Selecione o Vendedor</option>
						{vendedores.map((vendedor) => (
							<option
								key={vendedor.VendedorID}
								value={vendedor.VendedorID}
							>
								{vendedor.Nome}
							</option>
						))}
					</select>
				</div>

				<div className="mb-6">
					<label className="block text-gray-800 font-medium">
						Data do Pedido
					</label>
					<input
						type="date"
						name="dataPedido"
						value={formData.dataPedido}
						onChange={handleChange}
						className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div className="mb-6">
					<label className="block text-gray-800 font-medium">
						Produto
					</label>
					<select
						value={produtoSelecionado}
						onChange={(e) => setProdutoSelecionado(e.target.value)}
						className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						<option value="">Selecione o Produto</option>
						{produtos.map((produto) => (
							<option key={produto.ItemID} value={produto.ItemID}>
								{produto.NomeProduto}
							</option>
						))}
					</select>

					<div className="mt-4 flex items-center justify-between">
						<input
							type="number"
							value={quantidade}
							onChange={(e) =>
								setQuantidade(parseInt(e.target.value))
							}
							min="1"
							className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
						<button
							type="button"
							onClick={adicionarProduto}
							className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
						>
							Adicionar Produto
						</button>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-lg font-semibold">
						Produtos Adicionados
					</h3>
					{itensPedido.length > 0 ? (
						<ul className="list-none p-0">
							{itensPedido.map((item, index) => (
								<li
									key={index}
									className="flex justify-between items-center py-2 border-b border-gray-300"
								>
									<span>
										{item.NomeProduto} - R$
										{item.PrecoUnitario} x {item.Quantidade}
									</span>
									<button
										type="button"
										onClick={() => removerItem(index)}
										className="text-red-600 hover:text-red-800"
									>
										Remover
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500">
							Nenhum produto adicionado...
						</p>
					)}
				</div>

				<div className="mb-6">
					<button
						type="submit"
						className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
					>
						Finalizar Pedido • (
						{new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(valorPedido)}
						)
					</button>
				</div>

				{message && (
					<p className="mt-4 text-center text-red-500 font-semibold">
						{message}
					</p>
				)}
			</form>
		</div>
	);
};

export default CadastrarPedido;
