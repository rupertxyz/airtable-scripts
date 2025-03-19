// Sample script for realizing a dynamic multiple column layout via line items in DocsAutomator
const inputConfig = input.config()

const table = base.getTable("Invoices")
const record = await table.selectRecordAsync(inputConfig.recId)

const images = record.getCellValue("Images")

const imageTable = base.getTable("Images")
const imageRecords = await imageTable.selectRecordsAsync({recordIds: images.map(el => el.id)}).then(result => result.records)

let line_items_1 = []

for(let i = 0; i < imageRecords.length; i += 2) {
    const imageOne = imageRecords[i].getCellValue("Image")[0]
    const imageTwo = imageRecords[i + 1].getCellValue("Image")[0]
    line_items_1.push({
        image_one: imageOne.url,
        image_two: imageTwo.url,
    })
}

console.log(line_items_1)

// DocsAutomator API CALL
const res = await fetch('https://api.docsautomator.co/createDocument', {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ###'
    },
    body: JSON.stringify({
        docId: '67daf2158b1d871dcb62ea90',
        data: {
            line_items_1,
            randomPlaceholder: 'SOME DATA'
        }
    })
})

console.log(await res.json())
