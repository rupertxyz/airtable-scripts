const table = base.getTable("📝 Tasks, timelines, and assignees");
const records = await table.selectRecordsAsync({fields: ["Task"]}).then(result => result.records)

const filteredRecords = records.filter(record => record.getCellValue("Task") === null)
let filteredRecordIds = filteredRecords.map(rec => rec.id)

console.log("Deleting the following records...", filteredRecords)

// DELETE RECORDS
while(filteredRecordIds.length > 0) {
    await table.deleteRecordsAsync(filteredRecordIds.slice(0,50))
    filteredRecordIds = filteredRecordIds.slice(50)
}
