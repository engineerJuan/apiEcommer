import app from "./app";
const PORT = process.env.PORT || 300;

app.listen(PORT, () =>{
    console.log("Servidor corriendo en el puerto", PORT);
});