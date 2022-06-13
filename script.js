// Load coins table and fields "Symbol" and "Latest price"
const coinsTable = base.getTable("Coins");
const coinsQuery = await coinsTable.selectRecordsAsync({
    fields: ["Symbol", "Latest price"]
});

// Build a string of coin symbols to be used in our request url
const coinsSymbolsArr = coinsQuery.records.map(rec => rec.getCellValue("Symbol"));
const coinsSymbolsStr = coinsSymbolsArr.join(',');

// Fetch latest data for symbols (invalid coins will be ignored) and convert to EUR
let response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' + coinsSymbolsStr + '&skip_invalid=true' + '&convert=EUR',{
    headers: {
        "X-CMC_PRO_API_KEY": "PLEASE_INSERT_YOUR_API_KEY"
    }        
});

// only continue if fetching data was a success (status 200)
if(response.status === 200) {
    const data = await response.json();

    // In order to avoid an error for incorrect / unavailable symbols, 
    // we're extracting which coins have actually been fetched
    const listOfResponseCoins = Object.keys(data.data).join(',');

    // Build update array by filtering the list of coins for those that have been
    // fetched and mapping in order to create the right format for updateRecordsAsync()
    const updateArr = coinsQuery.records
    .filter(rec => listOfResponseCoins.includes(rec.getCellValue("Symbol")))
    .map(rec => {
        const id = rec.id;
        const latestPrice = data.data[rec.getCellValue("Symbol")].quote.EUR.price;

        return {
            id: id, 
            fields: {
                "Latest price": latestPrice,
            }
        }
    });

    // updating the table (this will fail for more than 50 records at a time)
    if(updateArr.length > 0) {
        await coinsTable.updateRecordsAsync(updateArr);
    }
}
