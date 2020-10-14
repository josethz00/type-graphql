import { createConnection } from "typeorm"

export const testConn = (drop: boolean = false) => {

    return createConnection({
        "name": "default",
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "04822131",
        "database": "typegraphql-test",
        "synchronize": drop,
        "dropSchema": drop,
        "entities": [
            `${__dirname}/../entities/*.*`
        ]
    });

};  