import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message));

const shot = (name) => page.screenshot({ path: `auth-${name}.png`, fullPage: false });

console.log("--- 1. Unauthenticated access to /directors/dashboard ---");
await page.goto("http://localhost:3000/directors/dashboard", { waitUntil: "networkidle" });
console.log("URL after nav:", page.url());
await shot("01-blocked-dashboard");

const testEmail = `test-fd-${Date.now()}@example.com`;
const testPassword = "TestPassword123!";

console.log("--- 2. Sign up:", testEmail, "---");
await page.goto("http://localhost:3000/directors/signup", { waitUntil: "networkidle" });
await page.fill("#email", testEmail);
await page.fill("#password", testPassword);
await page.fill("#confirmPassword", testPassword);
await page.click('button[type="submit"]');
await page.waitForTimeout(6000);
console.log("URL after signup:", page.url());
await shot("03-after-signup");
const bodyText = await page.evaluate(() => document.body.innerText);
console.log("Needs confirmation screen?", bodyText.includes("Check your email"));

if (page.url().includes("/directors/onboard")) {
  console.log("--- 4. Onboarding flow ---");
  await page.fill("#businessName", "Test Funeral Home E2E");
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(400);
  await page.fill("#address", "1 Test Street");
  await page.fill("#postcode", "TE1 1ST");
  await page.fill("#city", "Testville");
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(400);
  await page.fill("#phone", "01234567890");
  await page.fill("#fdEmail", "contact@testfuneral.example.com");
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(400);
  await shot("04-onboard-prices");
  // fill first price row
  const nameInputs = await page.locator('input[id^="sname-"]').all();
  const priceInputs = await page.locator('input[id^="price-"]').all();
  if (nameInputs[0]) await nameInputs[0].fill("Simple Funeral");
  if (priceInputs[0]) await priceInputs[0].fill("1500");
  await page.click('button:has-text("Go live on Vale")');
  await page.waitForTimeout(2000);
  console.log("URL after onboarding:", page.url());
  await shot("05-dashboard");

  const dashText = await page.evaluate(() => document.body.innerText);
  console.log("Dashboard shows business name?", dashText.includes("Test Funeral Home E2E"));

  const viewProfileHref = await page.locator('a:has-text("View profile")').first().getAttribute("href");
  console.log("View profile href:", viewProfileHref);

  console.log("--- 5. Hours tab ---");
  await page.click('button:has-text("Hours")');
  await page.waitForTimeout(500);
  await shot("06-hours-tab");
  await page.click('button:has-text("Save hours")');
  await page.waitForTimeout(1000);
  await shot("07-hours-saved");

  console.log("--- 6. Gallery & Team tab ---");
  await page.click('button:has-text("Gallery & Team")');
  await page.waitForTimeout(500);
  await page.click('button:has-text("Add first team member")');
  await page.fill('input[placeholder="e.g. Charles Smith"]', "Jane Doe");
  await page.fill('input[placeholder="e.g. Senior Funeral Director"]', "Test Director");
  await page.click('button:has-text("Add member")');
  await page.waitForTimeout(1000);
  await shot("08-team-added");
  const teamText = await page.evaluate(() => document.body.innerText);
  console.log("Team member persisted in UI?", teamText.includes("Jane Doe"));

  console.log("--- 7. Sign out ---");
  await page.click('button:has-text("Sign out")');
  await page.waitForTimeout(1000);
  console.log("URL after sign out:", page.url());

  console.log("--- 8. Re-access dashboard after sign out ---");
  await page.goto("http://localhost:3000/directors/dashboard", { waitUntil: "networkidle" });
  console.log("URL:", page.url());
  await shot("09-blocked-after-signout");

  console.log("--- 9. Log back in ---");
  await page.goto("http://localhost:3000/directors/login", { waitUntil: "networkidle" });
  await page.fill("#email", testEmail);
  await page.fill("#password", testPassword);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
  console.log("URL after login:", page.url());
  await shot("10-after-login");
}

console.log("\nConsole errors:", JSON.stringify(errors, null, 2));
await browser.close();
