output.markdown("# Create Task Report")

// pick view
const tasksTable = base.getTable("Tasks")
const view = await input.viewAsync("Please pick a view", tasksTable)

// get records from view
const records = await view.selectRecordsAsync().then(result => result.records)
console.log(records)

// create new report incl. linking of tasks
const reportName = await input.textAsync("Please define a name")
const reportDescription = await input.textAsync("Please give a description for this report")
const reportsTable = base.getTable("Reports")
const reportRecord = await reportsTable.createRecordAsync({
    "Name": reportName,
    "Description": reportDescription,
    "Tasks": records
})

if(reportRecord) {
  const res = await remoteFetchAsync('https://api.docsautomator.co/api/createDocument', {
    method: 'post',
    headers: {
        'content-type': 'application/json',
        'x-api-key': '###'
    },
    body: JSON.stringify({
        recId: reportRecord,
        docId:'65d729473663596f4277b335'
    })
  })
  console.log(res)
  console.log(await res.json())
}
