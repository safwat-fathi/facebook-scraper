import puppeteer, { Browser, Page } from "puppeteer";

class Scraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor(private url: string) {
    (async () => {
      await this._init();
    })();
  }

  // Initialize Puppeteer browser and page
  private async _init(): Promise<void> {
    try {
      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();

      // this.page.setDefaultNavigationTimeout(0);
      // this.page.setDefaultTimeout(0);
      this.page.setViewport({ width: 1920, height: 1080 });
      this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      );

      this.browser.on("disconnected", () => {
        console.log("Browser disconnected.");
      });
      // this.browser.on("targetchanged", () => {
      // 	console.log("Target changed.");
      // } );
    } catch (error) {
      console.error("Error initializing Puppeteer:", error);
    }
  }

  // Navigate to the URL
  public async navigate(): Promise<void> {
    try {
      if (!this.page) throw new Error("Browser or page not initialized.");
      await this.page.goto(this.url, { waitUntil: "networkidle2" });
    } catch (error) {
      console.error("Error navigating to URL:", error);
    }
  }

  // focus on the search field, type the search term and press enter
  public async search(searchTerm: string): Promise<void> {
    try {
      if (!this.page) throw new Error("Browser or page not initialized.");
      await this.page.focus("#search");
      await this.page.keyboard.type(searchTerm);
      await this.page.keyboard.press("Enter");
      await this.page.waitForNavigation({ waitUntil: "networkidle2" });
    } catch (error) {
      console.error("Error searching:", error);
    }
  }

  // click on marketplace link
  public async clickMarketplace(): Promise<void> {
    try {
      if (!this.page) throw new Error("Browser or page not initialized.");
      await this.page.click("a[href^='/marketplace']");
      await this.page.waitForNavigation({ waitUntil: "networkidle2" });
    } catch (error) {
      console.error("Error clicking on marketplace link:", error);
    }
  }

  // Get the search results
  public async getSearchResults(): Promise<NodeListOf<Element> | null> {
    try {
      if (!this.page) throw new Error("Browser or page not initialized.");
      // select all divs with style style="max-width: 381px; min-width: 242px;"
      // and store in array
      const results = await this.page.evaluate(() =>
        document.querySelectorAll(
          "div[style='max-width: 381px; min-width: 242px;']"
        )
      );

      return results;
    } catch (error) {
      console.error("Error getting search results:", error);
      return null;
    }
  }

  // scroll down to load more results
  public async loadMoreResults(): Promise<void> {
    try {
      if (!this.page) throw new Error("Browser or page not initialized.");
      await this.page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await this.page.w;
    } catch (error) {
      console.error("Error loading more results:", error);
    }
  }

  // Close the browser
  public async close(): Promise<void> {
    if (this.browser) await this.browser.close();
  }
}
