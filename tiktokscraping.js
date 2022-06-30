const table = base.getTable("Videos");
const record = await input.recordAsync("Please select a record", table);

if(record) {
    const response = await fetch('https://api.apify.com/v2/acts/sauermar~free-tiktok-scraper/run-sync-get-dataset-items?token=[YOUR API KEY]', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            "resultsPerPage": 20,
            "proxyConfiguration": {
                "useApifyProxy": true
            },
            "postURLs": [
                record.getCellValue("URL")
            ]
        })
    });

    const result = await response.json();

    console.log(result);

    // update the record
    if(result) {
        await table.updateRecordAsync(record.id, {
            "Number of comments": result[0].commentCount,
            "Number of likes": result[0].diggCount,
            "Number of shares": result[0].shareCount,
            "Number of views": result[0].playCount,
            "Duration (in seconds)": result[0].videoMeta.duration,
            "Created Time": result[0].createTimeISO,
        })
    }
}
