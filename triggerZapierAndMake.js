const inputConfig = input.config();
const response = await fetch('[URL]', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputConfig),
});
