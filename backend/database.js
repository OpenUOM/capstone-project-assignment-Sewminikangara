const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex_db);
}

const readTeachers = async () => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const deleteTeacher = async (id) => {
    const sql = `SELECT * FROM dummyData`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudents = async () => {
    // Write SQL query to select all student data
    const sql = `SELECT * FROM students`;

    try {
        // Execute the query
        const result = await db.query(sql);
        // Return the list of student data
        return result.rows;
    } catch (error) {
        throw new Error(`Error reading students: ${error.message}`);
    }
};
}

const readStudentInfo = async (id) => {
    // Write SQL query to select student information based on ID
    const sql = `SELECT * FROM students WHERE id = $1`;

    try {
        // Execute the query with the specified ID as parameter
        const result = await db.query(sql, [id]);
        // Return the student information
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error reading student info: ${error.message}`);
    }
};

}

const addStudent = async (name, age, grade) => {
    // Write SQL query to insert a new student
    const sql = `INSERT INTO students (name, age, grade) VALUES ($1, $2, $3) RETURNING *`;

    try {
        // Execute the query with student details as parameters
        const result = await db.query(sql, [name, age, grade]);
        // Return the newly added student
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error adding student: ${error.message}`);
    }
};

}

const updateStudent = async (id, name, age, grade) => {
    // Write SQL query to update student details based on ID
    const sql = `UPDATE students SET name = $1, age = $2, grade = $3 WHERE id = $4 RETURNING *`;

    try {
        // Execute the query with updated student details and ID as parameters
        const result = await db.query(sql, [name, age, grade, id]);
        // Return the updated student
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error updating student: ${error.message}`);
    }
};

} 
const deleteStudent = async (id) => {
    // Write SQL query to delete student based on ID
    const sql = `DELETE FROM students WHERE id = $1`;

    try {
        // Execute the query with the student ID as parameter
        await db.query(sql, [id]);
        // Return true if deletion is successful
        return true;
    } catch (error) {
        throw new Error(`Error deleting student: ${error.message}`);
    }
};

}

module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
