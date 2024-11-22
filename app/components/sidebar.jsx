"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const navigateTo = (path) => {
		router.push(path);
		setIsOpen(false);
	};

	return (
		<div className="flex">
			<div
				className={`fixed inset-y-0 left-0 transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64`}
			>
				<div className="flex items-center justify-between p-4 bg-gray-900">
					<h2 className="text-xl font-bold">Menu</h2>
					<button
						onClick={toggleSidebar}
						className={`text-white focus:outline-none `}
					>
						✕
					</button>
				</div>
				<nav className={`mt-4`}>
					<ul>
						<li
							className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
							onClick={() => navigateTo("/orders")}
						>
							Orders
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
							onClick={() => navigateTo("/relatorios")}
						>
							Relatórios
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
							onClick={() => navigateTo("/sellers")}
						>
							Vendedores
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
							onClick={() => navigateTo("/signup")}
						>
							Clientes
						</li>
					</ul>
				</nav>
			</div>
			<div className="flex-1">
				<button
					onClick={toggleSidebar}
					className={`p-4 bg-blue-500 text-white fixed top-4 left-4 z-50 ${
						isOpen ? "hidden" : ""
					}`}
				>
					☰
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
