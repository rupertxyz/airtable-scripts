// Load coins table and coin symbols
const coinsTable = base.getTable("Coins");
const coinsQuery = await coinsTable.selectRecordsAsync({
    fields: ["Symbol", "Latest price"]
});

const coinsSymbolsArr = coinsQuery.records.map(rec => rec.getCellValue("Symbol"));
const coinsSymbolsStr = coinsSymbolsArr.join(',');

// Fetch latest data for symbols
let response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=' + coinsSymbolsStr + '&skip_invalid=true' + '&convert=EUR',{
    headers: {
        "X-CMC_PRO_API_KEY": "INSERT_YOUR_OWN_KEY"
    }        
});

if(response.status === 200) {
    const data = await response.json();

    const listOfResponseCoins = Object.keys(data.data).join(',');

    // Build update array 
    const updateArr = coinsQuery.records
    .filter(rec => listOfResponseCoins.includes(rec.getCellValue("Symbol")))
    .map(rec => {
        const id = rec.id;
        const latestPrice = data.data[rec.getCellValue("Symbol")].quote.EUR.price;

        return {
            id: rec.id, 
            fields: {
                "Latest price": latestPrice,
            }
        }
    });
    if(updateArr.length > 0) {
        await coinsTable.updateRecordsAsync(updateArr);
    }
}
