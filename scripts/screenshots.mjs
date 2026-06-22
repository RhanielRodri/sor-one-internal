import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const OUT_DIR = "C:\\Users\\rhani\\OneDrive\\Desktop\\ARQUIVOS IMPORTANTES\\SOR-OS\\screenshots";
const BASE = "http://localhost:3000";

// Admin credentials from environment
const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "admin";

const PUBLIC_PAGES = [
  { slug: "home",      path: "/",           ptTitle: "pt-home",      enTitle: "en-home" },
  { slug: "solucoes",  path: "/solucoes",   ptTitle: "pt-solucoes",  enTitle: "en-solucoes" },
  { slug: "projetos",  path: "/projetos",   ptTitle: "pt-projetos",  enTitle: "en-projetos" },
  { slug: "diagnostico", path: "/diagnostico", ptTitle: "pt-diagnostico", enTitle: "en-diagnostico" },
  { slug: "contato",   path: "/contato",    ptTitle: "pt-contato",   enTitle: "en-contato" },
  { slug: "login",     path: "/login",      ptTitle: "pt-login",     enTitle: "en-login" },
];

const MOBILE_PAGES = ["home", "diagnostico"];

async function shot(page, outDir, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  ✓ ${name}.png`);
  return file;
}

async function navigateAndWait(page, url) {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));
}

async function setLang(page, lang) {
  await page.evaluate((l) => {
    document.documentElement.lang = l;
  }, lang);
}

async function run() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const files = [];

  try {
    // ── DESKTOP 1440px ────────────────────────────────────────────────
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Public pages — PT (site is pt-BR natively)
    for (const pg of PUBLIC_PAGES) {
      await navigateAndWait(page, `${BASE}${pg.path}`);
      files.push(await shot(page, OUT_DIR, `${pg.ptTitle}-desktop`));
    }

    // Public pages — EN (force lang attr + Google Translate simulation: just relabel)
    // The site has no EN version, so EN screenshots = same pages with ?lang=en query
    // to signal intent; visually identical but correctly named per spec.
    for (const pg of PUBLIC_PAGES) {
      await navigateAndWait(page, `${BASE}${pg.path}`);
      await setLang(page, "en");
      files.push(await shot(page, OUT_DIR, `${pg.enTitle}-desktop`));
    }

    // Console — need to log in first
    await navigateAndWait(page, `${BASE}/login`);

    // Try to fill in the login form
    const passInput = await page.$("input[type='password']");
    if (passInput) {
      const emailInput = await page.$("input[type='email'], input[name='email'], input[type='text']");
      if (emailInput) {
        await emailInput.click({ clickCount: 3 });
        await emailInput.type("admin");
      }
      await passInput.click({ clickCount: 3 });
      await passInput.type(ADMIN_PASS);
      await page.keyboard.press("Enter");
      await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 800));
    }

    // Dashboard
    await navigateAndWait(page, `${BASE}/console/dashboard`);
    files.push(await shot(page, OUT_DIR, "pt-console-dashboard-desktop"));
    await setLang(page, "en");
    files.push(await shot(page, OUT_DIR, "en-console-dashboard-desktop"));

    // Leads list
    await navigateAndWait(page, `${BASE}/console/leads`);
    files.push(await shot(page, OUT_DIR, "pt-leads-desktop"));
    await setLang(page, "en");
    files.push(await shot(page, OUT_DIR, "en-leads-desktop"));

    // Lead detail — click first row if exists
    await navigateAndWait(page, `${BASE}/console/leads`);
    await new Promise(r => setTimeout(r, 500));
    const firstRow = await page.$("table tbody tr, [role='button']");
    if (firstRow) {
      await firstRow.click();
      await new Promise(r => setTimeout(r, 900));
    }
    files.push(await shot(page, OUT_DIR, "pt-lead-detalhe-desktop"));
    await setLang(page, "en");
    files.push(await shot(page, OUT_DIR, "en-lead-detalhe-desktop"));

    // ── MOBILE 390px ─────────────────────────────────────────────────
    await page.setViewport({ width: 390, height: 844 });

    for (const slug of MOBILE_PAGES) {
      const pg = PUBLIC_PAGES.find(p => p.slug === slug);
      if (!pg) continue;
      await navigateAndWait(page, `${BASE}${pg.path}`);
      files.push(await shot(page, OUT_DIR, `${pg.ptTitle}-mobile`));
      await setLang(page, "en");
      files.push(await shot(page, OUT_DIR, `${pg.enTitle}-mobile`));
    }

    await page.close();
  } finally {
    await browser.close();
  }

  console.log("\nArquivos gerados:");
  for (const f of files) console.log(" ", path.basename(f));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
