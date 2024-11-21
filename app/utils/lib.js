import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('novo', 'db', 'yourStrongPassw0rd', {
	dialect: 'mssql',
	host: 'localhost',
	dialectOptions: {
		// Observe the need for this nested `options` field for MSSQL
		options: {
			// Your tedious options here
			useUTC: false,
			dateFirst: 1,
		},
	},
});