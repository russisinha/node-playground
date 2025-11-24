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

#### Run Operations
Execute CRUD operations
<br>

    node dbSetup.js


