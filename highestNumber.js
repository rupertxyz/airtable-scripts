// assign our input variables to a variable "inputConfig"
const inputConfig = input.config()

// load current table (can be via table name or id)
const table = base.getTable("Invoices table")

/* get all records in that table and limit selection 
to the number field (reference can be name or id) */
const records = await table.selectRecordsAsync({fields: ["Number"]})

// we then get numbers from the records array
const numbers = records.records.map(rec => rec.getCellValue("Number"))

// now we use Math.max() to calculate the higest number
const highestNumber = Math.max(...numbers)

/* and now we only have to add the highest number +1 
to the triggering (new record) */
await table.updateRecordAsync(inputConfig.recId, {
  "Number": highestNumber + 1
})
