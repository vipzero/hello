import puppeteer from 'puppeteer'

async function main() {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	})
	const page = await browser.newPage()
	const threadURL = 'http://hebi.5ch.net/test/read.cgi/news4vip/1556625403'
	await page.goto(threadURL)
	await page.type('form textarea', '自動保守テスト')
	await page.click('form [type=submit]')
	await page.waitForSelector('input[value=上記全てを承諾して書き込む]')

	await page.click('input[type=submit]')

	page.browser.close()
}

main()
