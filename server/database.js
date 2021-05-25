const mysql = require("mysql")

const db = mysql.createConnection({
    host:"localhost",
    user:"AllanG",
    password:"cnd80751xh",
    database:"auth_node"

})

module.exports = {
    database:db
}