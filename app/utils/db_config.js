export const dbConfig = {
	user: "sa",
	password: "dada",
	server: "localhost", // ou IP do seu servidor SQL
	database: "novo",
	options: {
		encrypt: false, // Se estiver usando conexão criptografada
		trustServerCertificate: true, // Para certificados não confiáveis
	},
};