const table = base.getTable("Table 1");
const record = await input.recordAsync("Please select the record", table)

if(record) {
    let i = 0
    if(!record.getCellValue("Name")) {
        output.text("Name is missing");
        i++;
    } 
    if(!record.getCellValue("Email")) {
        output.text("Email is missing");
        i++;
    } 
    if(!record.getCellValue("Company")) {
        output.text("Company is missing");
        i++;
    } 
    if(i === 0) {
        await table.updateRecordAsync(record.id, {
            "Checkbox": true
        })
    }
}
