import { Selector } from 'testcafe'; // Import Selector from TestCafe library

process.env.NODE_ENV = "test"; // Set the environment to "test"

fixture`Testing Teacher UI` // Define a TestCafe fixture for testing the Teacher UI
    .page`http://localhost:4401/`; // Set the page URL for testing

test('Testing search Teachers', async t => { // Define a TestCafe test case for searching teachers
    await t.navigateTo("/"); // Navigate to the homepage

    // Type "su" into the search input with the id "teacher-search"
    await t.typeText("#teacher-search", "su");

    const table = Selector('#teacher-table'); // Select the table with the id "teacher-table"
    const rowCount = await table.find('tr').count; // Count the number of rows in the table

    // Get the text of the last row in the table
    let tdText = await table.find('tr').nth(rowCount - 1).innerText;

    // Assert that the number of rows in the table is equal to 2
    await t.expect(rowCount).eql(2);

    await t.navigateTo("/dbinitialize"); // Navigate to the page for initializing the database
});
