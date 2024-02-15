// SCRIPT WAS FEATURES IN YOUTUBE VIDEO FEB 15, 2024
// Link: https://youtu.be/FO-fcQGRUlo

// Retrieve the configuration input for the current script or automation.
const inputConfig = input.config();

// Access the "Invoices" table from the base.
const table = base.getTable("Invoices");

// Asynchronously select records from the "Invoices" table.
const records = await table.selectRecordsAsync(
    {
        // Specify that only the "Calculated number" field is to be retrieved.
        fields: ["Calculated number"], 
        // Sort the records by the "Calculated number" field in descending order.
        sorts: [{field: "Calculated number", direction: 'desc'}]
    }
).then(result => result.records); // Once the records are fetched, extract the records array from the result.

// Map through the records to create an array of "Calculated number" values.
const numbers = records.map(rec => rec.getCellValue("Calculated number"))

// Determine the next higher number by adding 1 to the highest "Calculated number" in the list.
const nextHigherNumber = numbers[0] + 1

// Asynchronously update a specific record identified by `recId` in the input configuration.
await table.updateRecordAsync(inputConfig.recId, {
    // Set the "Calculated number" field to the new higher number calculated.
    "Calculated number": nextHigherNumber
})
