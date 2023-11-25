import puppeteer from "puppeteer";

const generatePDF = async (url, outputPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.pdf({ path: outputPath, format: "A4" });

  await browser.close();
};

export { generatePDF };
