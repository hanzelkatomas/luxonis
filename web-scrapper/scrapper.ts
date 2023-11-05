import puppeteer, {Page} from "puppeteer";


export const getFlatSellOffers = async (scrapUrl: string, offersPerPage: number, itemsToScrap: number) => {
  const browser = await puppeteer.launch({
    headless: "new",
    slowMo: 200,
    executablePath: "/opt/google/chrome/google-chrome",
    // For working in headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox", "window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")
  let totalOffers: { title: string, img: string}[] = []

  const pagesToScrap = Math.ceil(itemsToScrap / offersPerPage)

  for (let i = 0; i < pagesToScrap; i++) {
    const pageOffersTmp = await scrapPage(i, page, scrapUrl);
    totalOffers = [...totalOffers, ...pageOffersTmp]
  }

  await browser.close();
  return totalOffers
}

async function scrapPage(i: number, page: Page, scrapUrl: string) {
  await page.goto(`${scrapUrl}?page=${i + 1}`, {
    waitUntil: "load",
  });

  return await page.evaluate(() => {
    const offerEls = document.querySelectorAll(".property");
    const offerArr = Array.from(offerEls);

    return offerArr.map((offer) => {
      const title = offer
        .querySelector<HTMLSpanElement>(".title > span")
        ?.textContent ?? "Untitled";
      const img = offer.querySelector<HTMLImageElement>("a > img")?.src ?? "";

      return {
        title,
        img,
      };
    });
  })
}
