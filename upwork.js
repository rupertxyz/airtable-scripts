// 1. Grab JSON feed
const response = await fetch('https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Fwww.upwork.com%2Fab%2Ffeed%2Fjobs%2Frss%3Fq%3Dcontent%2Bwriting%26sort%3Drecency%26job_type%3Dhourly%26contractor_tier%3D3%26proposals%3D0-4%26hourly_rate%3D50-%26paging%3D0%253B50%26api_params%3D1%26securityToken%3D9bbcd837e2d653977a430c46b15d6cf36238d66fb96f38629034cbc329b83b6da3058d442c09d509e6a74d3e590ed377b7aa56e5f5f16380607375a2181f7b12%26userUid%3D898113043543969792%26orgUid%3D1416805817571987457');
// 2. Save result
const result = await response.json();

// 3. Save jobs array
const jobsArr = result.items;

// 4. Load table records
const jobsTable = base.getTable("Jobs");
const jobsQuery = await jobsTable.selectRecordsAsync({
    fields: ["URL"]
});

// 5. Create unique identifier / URL array
const uniqueUrls = jobsQuery.records.map(rec => rec.getCellValue("URL"));

// 6. Loop over jobs array and create CreateArr

const createArr = [];

jobsArr.forEach(job => {
    // check whether job already exists
    if(!uniqueUrls.includes(job.url)) {
        createArr.push({
            fields: {
                "Job title": job.title,
                "URL": job.url,
                "Date published": job.date_published,
            }
        })
    }
})

// 7. createRecordsAsync()
await jobsTable.createRecordsAsync(createArr);
