import "reflect-metadata";
import app2 from './app';
import { AppDataSource } from './config/db';
const {app, envConfig} = app2;
async function main() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected')
        app.listen(app.get("port"), () => {
            console.log("Server on port", app.get("port"));
        });
    } catch (e) {
        console.error(e);
    }
};

main();



