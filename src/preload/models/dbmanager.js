




// import {db} from "./dbmanager"

// const fs = require('fs');
// const path = require('path');

// export const dbgetNames = () => {
//     return new Promise((resolve, reject) => {
//     fs.readdir(path.join(__dirname, "../../resources"), (err, files) => {
//         console.log(__dirname)
//         if (err) {
//           console.error('Error reading directory:', err);
//           return;
//         }
//         let empty = []
//         console.log(typeof(files))
//         files.forEach(file => {
//             empty.push(file)
//           console.log(file);
//         });
//         resolve(empty)
//       });
//     });
// }

const path = require('path');

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      // TO JEST SCIEZKA DO BAZY DANYCH NA DEVELOPMENT
      filename: path.join(__dirname, '../../database/mysqlite.db'),
      // A TO SCIEZKA DO BAZ DANYCH NA PRODUKCJI XDDDDDD!!!!
      // filename: path.join(__dirname, '../../../database/mysqlite.db'),
    },
  });

export const dbgetNames = () => {
    return new Promise((resolve, reject) => {

        knex.select().from('test')
        .then(rows => {
          resolve(rows.map(r => r.name));
        })
        .catch(error => {
          reject(error);
        });

    });
};