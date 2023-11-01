import puppeteer from "puppeteer";
import postgres from "postgres";
import { createTable, truncateTable, addRow, getRows } from "./database";

const SCRAP_URL = "https://www.sreality.cz/en/search/for-sale/apartments";
const OFFERS_PER_PAGE = 20
const ITEMS_TO_SCRAP = 500
const getFlatSellOffers = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    executablePath: "/bin/google-chrome",
  });
  const page = await browser.newPage();

  let totalOffers = []
  const pagesToScrap = Math.ceil(ITEMS_TO_SCRAP / OFFERS_PER_PAGE)

  for (let i = 0; i < pagesToScrap; i++) {
    await page.goto(`${SCRAP_URL}?page=${i + 1}`, {
      waitUntil: "load",
    });

    const pageOffers = await page.evaluate(() => {
      const offerEls = document.querySelectorAll(".property");
      const offerArr = Array.from(offerEls);

      return offerArr.map((offer) => {
        const title = offer.querySelector<HTMLSpanElement>(".title > span").textContent;
        const img = offer.querySelector<HTMLImageElement>("a > img")?.src;

        return {
          title,
          img,
        };
      });
    });

    totalOffers = [...totalOffers, ...pageOffers]
  }

  return totalOffers
  // await browser.close();
}

// const result = await getFlatSellOffers();

console.log(await getRows())

// console.log(result.length, "result", result)
