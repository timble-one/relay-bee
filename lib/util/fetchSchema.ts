import {buildClientSchema, getIntrospectionQuery, printSchema} from "graphql";
import * as fs from "fs";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

fetch('http://localhost/graphql', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': 'very-secret-token',
    },
    body: JSON.stringify({
        query: getIntrospectionQuery(),
    })
})
.then(res => res.json())
.then(schemaJSON => printSchema(buildClientSchema(schemaJSON.data)))
.then(clientSchema =>
    fs.writeFileSync('src/schema.graphql', clientSchema),
);