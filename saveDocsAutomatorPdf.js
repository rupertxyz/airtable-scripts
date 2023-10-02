const inputConfig = input.config()

const res = await fetch('https://api.docsautomator.co/api/createDocument', {
  method: 'post',
  headers: {
      'content-type': 'application/json',
      'x-api-key': '###'
  },
  body: JSON.stringify({
      recId: inputConfig.recId,
      docId:'###'
  }) 
})

// console.log(res)
// console.log(await res.json())

const responseData = await res.json()
console.log(responseData)
const pdf = responseData.pdfUrl

// get a reference to your table
const table = base.getTable("TABLE NAME")

// update record
await table.updateRecordAsync(inputConfig.recId, {
  "PDF FIELD": pdf
})
