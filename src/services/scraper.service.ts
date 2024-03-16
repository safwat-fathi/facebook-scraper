import puppeteer, { Browser, Page } from "puppeteer";

class Scraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor(private url: string) {}

  // Initialize Puppeteer browser and page
  public async init(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  // Navigate to the URL
  public async navigate(): Promise<void> {
    if (!this.page) throw new Error("Browser or page not initialized.");
    await this.page.goto(this.url, { waitUntil: "networkidle2" });
  }

  // Example scraping function: getTitle
  public async getTitle(): Promise<string | undefined> {
    if (!this.page) throw new Error("Browser or page not initialized.");
    return this.page.title();
  }

  // Close the browser
  public async close(): Promise<void> {
    if (this.browser) await this.browser.close();
  }
}
