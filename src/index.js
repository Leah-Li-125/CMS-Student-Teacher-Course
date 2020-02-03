require("dotenv").config();
const express = require("express");
require("express-async-errors");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const { connectToDB } = require("./utils/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;
const morganLog =
	process.env.NODE_ENV === "production" ? morgan("common") : morgan("dev");

app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

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
