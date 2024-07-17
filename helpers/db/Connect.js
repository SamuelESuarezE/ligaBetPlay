import { MongoClient } from 'mongodb';
import 'dotenv/config'

export class Connect {
    static instanceConnect;
    db;
    user;
    port;
    cluster;
    #url;
    #host;
    #pass;
    #dbName;
    constructor({ host, user, pass, port, cluster, dbName } = {
        host: process.env.MONGODB_HOST,
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASS,
        port: process.env.MONGODB_PORT,
        cluster: process.env.MONGODB_CLUSTER,
        dbName: process.env.MONGODB_DBNAME
    }) {
        if (Connect.instanceConnect) {
            return Connect.instanceConnect;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open();
        Connect.instanceConnect = this;
    }

    set setHost(host) {
        this.#host = host;
    }

    set setPass(pass) {
        this.#pass = pass;
    }

    set setDbName(dbName) {
        this.#dbName = dbName;
    }

    get getDbName() {
        return this.#dbName;
    }

    destructor() {
        Connect.instanceConnect = undefined;
    }

    async #open() {
        this.#url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(this.#url);
        try {
            this.db = this.conexion.db(this.#dbName);
        } catch(error){
            return {
                error: `Error connecting to MongoDB`,
                errInfo: error
            }
        }
    }
}