// SCRIPT WAS FEATURES IN YOUTUBE VIDEO FEB 15, 2024
// LINK: https://youtu.be/FO-fcQGRUlo

let table = base.getTable("Invoices") // Change "YourTableName" to your actual table name
let query = await table.selectRecordsAsync({
    fields: ["Calculated number"]
});

// Find the highest number in "Calculated number" field
let maxNumber = Math.max(...query.records.map(record => record.getCellValue("Calculated number") || 0));

// Increment the number by 1 for the new invoice
let newInvoiceNumber = maxNumber + 1;

// Assuming `input.config()` is used to pass the record ID of the newly created record
let recordId = input.config().recId;

// Update the new record with the incremented invoice number
await table.updateRecordAsync(recordId, {
    "Calculated number": newInvoiceNumber
});
