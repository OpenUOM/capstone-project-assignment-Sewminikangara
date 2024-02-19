import { Selector } from 'testcafe'; // Import Selector from TestCafe library

process.env.NODE_ENV = "test"; // Set the environment to "test"

fixture`Testing Student UI` // Define a TestCafe fixture for testing the Student UI
    .page`http://localhost:4401/student`; // Set the page URL for testing

test('Testing search students', async t => { // Define a TestCafe test case for searching students
    await t.navigateTo("/student"); // Navigate to the student page

    // Type "si" into the search input with the id "student-search"
    await t.typeText("#student-search", "si");

    const table = Selector('#student-table'); // Select the table with the id "student-table"
    const rowCount = await table.find('tr').count; // Count the number of rows in the table

    // Get the text of the last row in the table
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    // Assert that the number of rows in the table is equal to 2
    await t.expect(rowCount).eql(2);

    await t.navigateTo("/dbinitialize"); // Navigate to the page for initializing the database
});
