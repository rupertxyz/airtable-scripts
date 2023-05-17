const { recId } = input.config()

function delay(ms) {
    let limit = new Date();
    limit = limit.setMilliseconds(limit.getMilliseconds() + ms);
    while ((new Date()) < limit) {
        // do nothing
        ;
    }
    console.log(`Finished in ${ms / 1000} seconds`)
}

delay(5000)

// update attachment field
const table = base.getTable("Invoices")
const record = await table.selectRecordAsync(recId)

if(record) {
    const chartLink = record.getCellValue("Chart link")
    await table.updateRecordAsync(recId, {
        "Chart image": [{url: chartLink, filename: "new chart"}]
    })
}
