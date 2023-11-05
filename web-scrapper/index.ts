import {addRow, createTable, truncateTable} from "./database";
import {getFlatSellOffers} from "./scrapper.ts";
import {runApiEndpoint} from "./api.ts";

const SCRAP_URL = "https://www.sreality.cz/en/search/for-sale/apartments";
const OFFER_PER_PAGE = 20
const ITEMS_TO_SCRAP = 500

const result = await getFlatSellOffers(SCRAP_URL, OFFER_PER_PAGE, ITEMS_TO_SCRAP).then()
console.log(result.length + " offers were found")

await createTable()
await truncateTable()

result.forEach(async ({img, title}) => await addRow(img, title))
runApiEndpoint()

