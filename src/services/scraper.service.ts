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

  // Close the browser
  public async close(): Promise<void> {
    if (this.browser) await this.browser.close();
  }
}
