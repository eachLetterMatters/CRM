
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
    knex.select().from('klienci')
      .then(rows => {
        // console.log(rows);
        resolve(rows);
      })
      .catch(error => {
        reject(error);
      });

  });
};

// Define data to insert
const testItem = {
  name: "Nowa firma",
  phone_number: "789123456",
  www: "www.google.com",
  fb: "www.facebook.com",
  description: null,
  is_active: 1,
  is_commercial: 1,
};

export const dbAddClient = () => {
  // Insert new item into the database
  knex('klienci')
    .insert(testItem)
    .then(() => {
      console.log('New item inserted successfully');
    })
    .catch(error => {
      console.error('Error inserting new item:', error);
    });
}

export const dbGetClient = (id) => {
  return new Promise((resolve, reject) => {
    knex('klienci')
      .where({ id: id })
      .first()
      .then(entity => {
        resolve(entity);
        // console.log(entity);
      })
      .catch(error => {
        reject(entity);
        // console.error('Error getting entity:', error);
      });
  });
}

export const dbRemoveClient = (id) => {
  knex('klienci')
    .where({ id: id })
    .del()
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}


// ============ PERSONS HANDLING ================
const testPerson = {
  name: "Nowa firma",
  phone_number: "789123456",
  www: "www.google.com",
  fb: "www.facebook.com",
  description: null,
  is_active: 1,
  is_commercial: 1,
};

export const dbAddPerson = (clientId) => {
  // Insert new item into the database
  knex('persons')
    .insert({
      client_id: clientId,
      name: "Jan",
      surname: "Kowalski",
      phone_number: "123123213",
      email: "test@wp.pl"
    })
    .then(() => {
      console.log('New item inserted successfully');
    })
    .catch(error => {
      console.error('Error inserting new item:', error);
    });
}

export const dbGetPersons = (clientId) => {
  return new Promise((resolve, reject) => {
    knex('persons')
    .select('*')
    .where("client_id", clientId)      
    .then(rows => {
        // console.log(rows);
        resolve(rows);
      })
      .catch(error => {
        reject(error);
      });
  });
}