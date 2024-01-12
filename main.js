const logger = require("./src/middleware/Logging");
const app = require("./src/App");

app.listen(process.env.PORT, () => {
     logger.info(`Server running on port ${process.env.PORT}`);
});
