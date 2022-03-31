import dataHooks from "../../src/dataHooks/dataHooks"
import puppeteer from "puppeteer"
import "pptr-testing-library/extend"

describe("e2e tests", () => {
  let browser: puppeteer.Browser
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false })
  })
  afterAll(async () => {
    await browser.close()
  })
  test.only("launch puppeteer", async () => {
    const page = await browser.newPage()
    await page.goto("http://localhost:5001/")
    await page.setCookie({
      name: "userID",
      value: "d9eff945-a2e1-480d-a394-d582675bca98",
    })

    const addItem = await page.$(`[data-hook=${dataHooks.addItem}]`)
    await addItem?.type("Where is Sean?!", { delay: 100 })
    await addItem?.press("Enter")
    const item = await page.waitForSelector(`[data-hook=${dataHooks.todoText}]`)
    const itemValue = await (await item?.getProperty("innerHTML"))?.jsonValue()

    expect(itemValue).toContain("Where is Sean?!")
  })
})

