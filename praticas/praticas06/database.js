import { MongoClient } from "mongodb"; 

const url = "mongodb+srv://gabriel:05052004@cluster0.j4iqicb.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() { 
    try {
        await client.connect();
        console.log("Conectando com sucesso ao MongoDB!");
        return client.db('agenda');
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
}

export { conectarDb };