import puppeteer, {Page} from "puppeteer";


export const getFlatSellOffers = async (scrapUrl: string, offersPerPage: number, itemsToScrap: number) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: "/bin/google-chrome",
  });

  const page = await browser.newPage();
  let totalOffers = []

  const pagesToScrap = Math.ceil(itemsToScrap / offersPerPage)

  for (let i = 0; i < pagesToScrap; i++) {
    const pageOffersTmp = await scrapPage(i, page, scrapUrl);
    totalOffers = [...totalOffers, ...pageOffersTmp]
  }

  return totalOffers
  // TODO - close browser
  // await browser.close();
}

async function scrapPage(i: number, page: Page, scrapUrl: string) {
  await page.goto(`${scrapUrl}?page=${i + 1}`, {
    waitUntil: "load",
  });

  return await page.evaluate(() => {
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
  })
}
