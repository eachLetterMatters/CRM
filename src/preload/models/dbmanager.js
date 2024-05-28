
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

//
// ============ CLIENTS TABLE OPERATIONS ================
//

// Define data to insert
// const testItem = {
//   name: "Nowa firma",
//   phone_number: "789123456",
//   www: "www.google.com",
//   fb: "www.facebook.com",
//   description: null,
//   is_active: 1,
//   is_commercial: 1,
// };

export const dbAddClient = (newClient) => {
  // Insert new item into the database
  knex('clients')
    .insert(newClient)
    .then(() => {
      console.log('New item inserted successfully');
    })
    .catch(error => {
      console.error('Error inserting new item:', error);
    });
}

export const dbGetClients = () => {
  return new Promise((resolve, reject) => {
    knex.select().from('clients')
      .then(rows => {
        // console.log(rows);
        resolve(rows);
      })
      .catch(error => {
        reject(error);
      });

  });
};

export const dbGetClient = (id) => {
  return new Promise((resolve, reject) => {
    knex('clients')
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

export const dbUpdateClient = (id, data) => {
  knex('clients')
    .where({ id: id })
    .update(data)
    .then(() => {
      console.log('Item updated successfully');
    })
    .catch(error => {
      console.error('Error updating item:', error);
    });
}

export const dbRemoveClient = (id) => {
  knex('clients')
    .where({ id: id })
    .del()
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}

//
// ============ PERSONS TABLE OPERATIONS ================
//

// const testPerson = {
//   client_id: null,
//   name: "Janek",
//   surname: "Nowak",
//   phone_number: "1111",
//   email: "test@gmail.com"
// };

export const dbAddPerson = (newPerson) => {
  // Insert new item into the database
  knex('persons')
    .insert(newPerson)
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

export const dbRemovePerson = (id) => {
  knex('persons')
    .where({ id: id })
    .del()
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}

//
// ============ QUICKNOTES OPERATIONS ================
//

const testQuickNote = {
  content: "Testowy tekst na taką dosyć średnią długość"
};

export const dbAddNote = (new_note) => {
  // Insert new item into the database
  knex('quicknotes')
    .insert(testQuickNote)
    .then(() => {
      console.log('New item inserted successfully');
    })
    .catch(error => {
      console.error('Error inserting new item:', error);
    });
}

export const dbGetNotes = () => {
  return new Promise((resolve, reject) => {
    knex('quicknotes')
    .select('*') 
    .then(rows => {
        // console.log(rows);
        resolve(rows);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const dbRemoveNote = (id) => {
  knex('quicknotes')
    .where({ id: id })
    .del()
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}

//
// ============ ACTIONS OPERATIONS ================
//

export const dbAddAction = (newAction) => {
  // Insert new item into the database
  knex('actions')
    .insert(newAction)
    .then(() => {
      console.log('New item inserted successfully');
    })
    .catch(error => {
      console.error('Error inserting new item:', error);
    });
}

export const dbGetActions = (clientId) => {
  return new Promise((resolve, reject) => {
    knex('actions')
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

export const dbRemoveAction = (id) => {
  knex('actions')
    .where({ id: id })
    .del()
    .then(() => {
      console.log('Item deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}