// Importamos la librería de CORS. / We import the CORS library.
import cors from "cors";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Creamos una variable donde personalizaremos la configuración de CORS. /  We create a variable where we will customize the CORS settings.
export const corsMiddleware = cors({
    origin: "*",                                         // ← Origen u origenes que estaran permitidos. / Source or sources that will be permitted.
    methods: ["GET", "POST", "PUT", "DELETE"],           // ← Metodos que podrán hacer en la petición. / Methods that may be used in the request.
    allowedHeaders: ["Content-Type", "Authorization"],   // ← Headears de autorización. / Authorization headers.
});