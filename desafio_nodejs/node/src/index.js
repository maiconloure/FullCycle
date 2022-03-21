const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config)

function addPeople() {
    connection.query("INSERT INTO people (name) VALUES ('Maicon')");
}

async function findPeople() {
    const findPeopleQuery = "SELECT name FROM people"

    return await requestQuery(findPeopleQuery, null)
        .then(rows => rows.map(people => people.name));
}

const requestQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        connection.query(query, data, (error, res) => {
            error ? reject(error) : resolve(res)
        })
    })
}

app.get('/', async (req, res) => {
    const peoples = await findPeople();
    const peopleList = getListPeoples(peoples);

    const result = "<h1>Full Cycle Rocks!</h1>\n" + peopleList;

    res.send(result);
});

function getListPeoples(peoples) {
    let items = ""
    peoples.forEach(peopleName => {
        items = items + "<li>" + peopleName + "</li>\n";
    });
    return "<ul>" + items + "</ul>"
}

app.listen(port, () => {
    addPeople();
    console.log('Rodando na porta ' + port)
})