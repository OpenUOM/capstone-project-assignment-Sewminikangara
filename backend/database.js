const dbConnection = require("./sqlite");
const knex_db = require("./db-config");

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

// Function to reset the database (if needed)
const dbinitialize = async () => {
  try {
    await testBase.resetDatabase(knex_db);
  } catch (error) {
    throw new Error(`Error initializing database: ${error.message}`);
  }
};

/** TEACHER FUNCTIONS **/

// Read all teachers
const readTeachers = async () => {
  const sql = `SELECT * FROM teacher`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql)
      .then((data) => resolve(data))
      .catch((error) => reject(new Error(`Error reading teachers: ${error.message}`)));
  });
};

// Read teacher information by ID
const readTeacherInfo = async (id) => {
  const sql = `SELECT * FROM teacher WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((data) => resolve(data))
      .catch((error) => reject(new Error(`Error reading teacher info: ${error.message}`)));
  });
};

// Add a new teacher
const addTeacher = async (id, name, age) => {
  const sql = `INSERT INTO teacher(id, name, age) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id, name, age])
      .then(() => resolve({ status: "Successfully inserted Teacher" }))
      .catch((error) => reject(new Error(`Error adding teacher: ${error.message}`)));
  });
};

// Update a teacher's information
const updateTeacher = async (name, age, id) => {
  const sql = `UPDATE teacher SET name = ?, age = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [name, age, id])
      .then(() => resolve({ status: "Successfully updated Teacher" }))
      .catch((error) => reject(new Error(`Error updating teacher: ${error.message}`)));
  });
};

// Delete a teacher by ID
const deleteTeacher = async (id) => {
  const sql = `DELETE FROM teacher WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then(() => resolve({ status: "Successfully deleted Teacher" }))
      .catch((error) => reject(new Error(`Error deleting teacher: ${error.message}`)));
  });
};

/** STUDENT FUNCTIONS **/

// Read all students
const readStudents = async () => {
  const sql = `SELECT * FROM student`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql)
      .then((students) => resolve(students))
      .catch((error) => reject(new Error(`Error reading students: ${error.message}`)));
  });
};

// Read student information by ID
const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM student WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then((student) => resolve(student))
      .catch((error) => reject(new Error(`Error reading student info: ${error.message}`)));
  });
};

// Add a new student
const addStudent = async (id, name, age) => {
  const sql = `INSERT INTO student(id, name, age) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id, name, age])
      .then(() => resolve({ status: "Successfully inserted Student" }))
      .catch((error) => reject(new Error(`Error adding student: ${error.message}`)));
  });
};

// Update a student's information
const updateStudent = async (name, age, id) => {
  const sql = `UPDATE student SET name = ?, age = ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [name, age, id])
      .then(() => resolve({ status: "Successfully updated Student" }))
      .catch((error) => reject(new Error(`Error updating student: ${error.message}`)));
  });
};

// Delete a student by ID
const deleteStudent = async (id) => {
  const sql = `DELETE FROM student WHERE id = ?`;
  return new Promise((resolve, reject) => {
    knex_db
      .raw(sql, [id])
      .then(() => resolve({ status: "Successfully deleted Student" }))
      .catch((error) => reject(new Error(`Error deleting student: ${error.message}`)));
  });
};

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
  updateTeacher,
};
