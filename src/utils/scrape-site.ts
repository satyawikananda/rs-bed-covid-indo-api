import cheerio from "cheerio"
import fetch from "node-fetch"
import { Agent } from "https"
import { BASE_URL } from "~/const"

const agent = new Agent({ rejectUnauthorized: false })

export const scrapeSite = async (endpoint: string) => {
  try {
    const fetchSite = await fetch(`${BASE_URL}${endpoint}`, { agent })
    const html = await fetchSite.text()
    const status = fetchSite.status
    const $ = cheerio.load(html)
    return { $, status }
  } catch (e) {
    return Promise.reject(e)
  }
}
