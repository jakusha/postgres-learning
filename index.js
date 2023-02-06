const express = require("express");
const db = require("./config/db");
const app = express();
const hairStyleRouter = require("./router/hairstyle");
//built in expressjs json parser middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "hello world" });
});
app.use("/hairstyle", hairStyleRouter);
const PORT = 3000;

//connect to database and start server
const startDb = async () => {
	try {
		await db.authenticate();
		await db.sync();
		console.log("Connection has been established successfully.");
		app.listen(PORT, () => {
			console.log(`app listening at port ${PORT}`);
		});
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

startDb();
