require("dotenv").config();
const express = require("express");

const routes = require("./routes");
const { connectToDB } = require("./utils/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

connectToDB()
	.then(() => {
		console.log("DB connected");
		app.listen(PORT, () => {
			console.log(`server is listening on PORT ${PORT}`);
		});
	})
	.catch(e => {
		console.log("DB connection failed");
		console.error(e.message);
		process.exit(1); //exit(anyNumberBut0) because exit(0) means normal exit, not exit because of connection to db fail error
	});

/* auto attach on debug tool: command+shift+p -- debug: toggle to auto
terminal: node --inspect index.js
or use nodemon instead of node to listen:
go to package.json to add "debug": "nodemon --inspect src/index.js" into scripts
then command line: npm run debug
*/
