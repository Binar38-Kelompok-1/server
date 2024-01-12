const { format, createLogger, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const customFormat = format.combine(
     format.timestamp({
          format: "YYYY/MM/DD HH:mm:ss",
     }),
     format.printf(({ level, message, timestamp }) => {
          return `${timestamp}\n${level} => ${message}\n`;
     }),
     format.colorize({ level: true })
);

const customLogs = format.combine(
     format.timestamp({
          format: "YYYY/MM/DD HH:mm:ss",
     }),
     format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level} => ${message}`;
     }),
     format.colorize({ level: true })
);

const consoleTransport = new transports.Console({
     format: customFormat,
});

const fileTransport = new DailyRotateFile({
     filename: "./logs/%DATE%-logger.log",
     datePattern: "YYYY-MM-DD",
     maxSize: "10kb",
     maxFiles: "7d",
});

const logger = createLogger({
     level: "info",
     format: customLogs,
     transports: [consoleTransport, fileTransport],
});

module.exports = logger;
