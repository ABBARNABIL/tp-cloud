const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

const getVisitors = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM visitors ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createVisitor = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, email } = body;
    pool.query(
      "INSERT INTO visitors (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new visitor has been added: ${results.rows[0]}`);
      }
    );
  });
};

const deleteVisitor = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query("DELETE FROM visitors WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Visitor deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getVisitors,
  createVisitor,
  deleteVisitor,
};
