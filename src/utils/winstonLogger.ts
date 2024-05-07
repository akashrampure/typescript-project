import winston, { format } from "winston";

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({level, message, timestamp}) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports:[
    new winston.transports.Console()
  ],
});


export default logger;
