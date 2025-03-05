import { ExecutionEnviornment } from "@/lib/types";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

const BROWSER_WS = "wss://brd-customer-hl_d34c01ee-zone-ux_flow_browser:f5bu2q98e1ru@brd.superproxy.io:9222";

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");
    console.log(websiteUrl);

    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WS
    })
    enviornment.log.info("Browser started successfully");
    enviornment.setBrowser(browser);
    const page = await browser.newPage();
    page.setViewport({ width: 2560, height: 1440 });
    await page.goto(websiteUrl);
    enviornment.setPage(page);
    enviornment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
