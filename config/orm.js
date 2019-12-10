const connection = require('./connection');

// Helper function for SQL syntax
// Loops through and creates an array of question marks and turns it into a string
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
   let arr = [];

   for (let i = 0; i < num; i++) {
      arr.push('?');
   }
   return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
   let arr = [];

   // Loop through the keys and push the key/value as a string int arr
   for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
         // if string with spaces, add quotation (Lana Del Grey => 'Lana Del Grey)
         if (typeof value === 'string') {
            // value = "'" + value + "'";
            value = `'${value}'`;
         }
         // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
         // e.g. {sleepy: true} => ["sleepy=true"]
         // arr.push(key + '=' + value);
         arr.push(`${key}=${value}`);
      }
   }
   
   // Translate array of strings to a single comma-separated string
   return arr.toString();
}

// Object for all our SQL statement functions
const orm = {

   selectAll: (table, cb) => {
      let queryString = `SELECT * FROM ${table};`;

      connection.query(queryString, (err, result) => {
         if(err) {
            throw err;
         }
         cb(result);
      });
   },

   insertOne: (table, cols, vals, cb) => {

      let queryString = `INSERT INTO ${table}`;
      queryString += ' (';
      queryString += cols.toString();
      queryString += ') ';
      queryString += 'VALUES (';
      queryString += printQuestionMarks(vals.length);
      queryString += ') ';

      console.log(queryString);
      connection.query(queryString, vals, (err, result) => {
         if (err) {
            throw err;
         }
         cb(result);
      });
   },

   updateOne: (table, objColVals, condition, cb) => {

      let queryString = `UPDATE ${table}`;
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, (err, result) => {
         if (err) {
            throw err;
         }
         cb(result);
      });
   },

   deleteOne: (table, condition, cb) => {

      let queryString = `DELETE FROM ${table}`;
      queryString += ' WHERE ';
      queryString += condition;

      connection.query(queryString, (err, result) => {
         if (err) {
            throw err;
         }
         cb(result);
      });
   }
};

module.exports = orm;