const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking the 'Draw' button displays the div with id = 'choices'", async () => {
    await driver.get("http://localhost:8000");
    const drawBtn = await driver.findElement(By.id("draw"));
    await drawBtn.click();

    const choicesDiv = await driver.findElement(By.id("choices"));
    const isDisplayed = await choicesDiv.isDisplayed();

    expect(isDisplayed).toBe(true);
  });

  test("when a bot is 'Removed from Duo,' it goes back to 'choices'", async () => {
    await driver.get("http://localhost:8000");
    const drawBtn = await driver.findElement(By.id("draw"));
    await drawBtn.click();

    const choicesDiv = await driver.findElement(By.id("choices"));
    const firstBotAddBtn = await driver.findElement(By.xpath("//button[contains(@onclick, 'chooseBot')]"));
    await firstBotAddBtn.click();

    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    const firstBotRemoveBtn = await playerDuoDiv.findElement(By.xpath("//button[contains(@onclick, 'putBotBack')]"));
    await firstBotRemoveBtn.click();

    const isBotInChoices = await choicesDiv.findElement(By.xpath("//button[contains(@onclick, 'chooseBot')]")).isDisplayed();

    expect(isBotInChoices).toBe(true);
  });
});
