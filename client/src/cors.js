import cors from "cors";

const corsMiddleware = cors({
    origin: "pandorahali.com", // Replace with your allowed origin
    methods: ["*"], // Replace with your allowed methods
    allowedHeaders: ["*"], // Replace with your allowed headers
    credentials: true, // Replace with your desired credential setting
});

export default corsMiddleware;