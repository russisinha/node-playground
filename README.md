## This is a NodeJS playgound

`index`: index files with important library usages.
<br/>
`examples`: sample implementation examples using basic NodeJs features.
<br/>
`server`: sample files for various routing implementions.
`static`: Files with static content used in other examples.
<br>
<br>
Run `node <filename>` to execute any spefic sample implementation.
<br>
<br>
### Steps to execute:
#### Configure PostgreSQL db (Add variables)
Create .env file and add the following values:
<br>

    DBPORT=5432 // Default PostgreSQL port
    USER=<user> // PostgreSQL username
    HOST=<host> // Database server address
    DATABASE=<dbname> // Name of the database
    PASSWORD=<password> // Database password

#### Setup DB
Create required db tables
<br>

    node dbSetup.js

#### Start the server

    node server.js


#### Run DB Operations
Add task

    curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "Complete homework", "description": "Finish math exercises"}'

Get all tasks

    curl -X GET http://localhost:3000/tasks

Get task by id

    curl -X GET http://localhost:3000/tasks/1

Update task

    curl -X PATCH http://localhost:3000/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"status": "Completed"}'

Delete task

    curl -X DELETE http://localhost:3000/tasks/1

Verify data in DB

    su - postgres -c "psql -d <dbName> -c 'SELECT * FROM <tableName>;'"