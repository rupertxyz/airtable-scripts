// Grab the data from record
const table = base.getTable("Leads")
const record = await input.recordAsync("Please select a record", table);

const description = record.getCellValue("Description")
console.log(description)

// Send a request to ChatGPT / OpenAI APi
const res = await remoteFetchAsync("https://api.openai.com/v1/chat/completions", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "Please act like a startup expert"
            },
            {
                "role": "user",
                "content": `Please summarize the following description of a startup in max 20 words, short and snappy and please without quotes: ${description}`
            }
        ]
    })
})

console.log(res)
const response = await res.json()
const responseMessage = response.choices[0].message.content;

// Update the record with ChatGPT result
if(responseMessage) {
    await table.updateRecordAsync(record.id, {
        "AI Summary": responseMessage
    })
}
