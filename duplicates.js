const config = input.config({
    title: "Removing duplicates based on table and field",
    description: "Please select the table, field, created time field and whether you want to keep the youngest or oldest record",
    items: [
        input.config.table('table', {
            label: "Table"
        }),
        input.config.field('field', {
            label: "Field",
            parentTable: "table"
        }),
        input.config.field('createdTime', {
            label: "Created time",
            description: "Please select a created time field in your table",
            parentTable: "table"
        }),
        input.config.select('youngestOrOldest', {
            label: "Keep youngest or oldest record?",
            options: [
                {
                    value: "Youngest"
                },
                {
                    value: "Oldest"
                }
            ]
        })
    ]
})

if(config.createdTime.type !== "createdTime") {
    output.markdown(`## Please choose a time field!`);
} else {
    const dTable = base.getTable(config.table.id);
    const dTableRecords = await dTable.selectRecordsAsync({
        sorts: [{field: config.createdTime.id, direction: "asc"}],
        fields: [config.field.id]
    }).then(result => result.records.map(rec => ({id: rec.id, field: rec.getCellValue(config.field.id).trim()})))

    // let's find duplicate records!
    let duplicateRecords = null;
    if(config.youngestOrOldest == "Oldest") duplicateRecords = dTableRecords.filter((rec, i, arr) => arr.map(el => el.field).indexOf(rec.field) !== i);
    if(config.youngestOrOldest == "Youngest") duplicateRecords = dTableRecords.filter((rec, i, arr) => arr.map(el => el.field).lastIndexOf(rec.field) !== i);
    
    // delete duplicate records
    duplicateRecords = duplicateRecords.map(rec => rec.id);
    
    while(duplicateRecords.length > 0) {
        await dTable.deleteRecordsAsync(duplicateRecords.slice(0,50));
        duplicateRecords = duplicateRecords.slice(50);
    }
}
