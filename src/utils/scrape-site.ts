import cheerio from "cheerio"
import fetch from "isomorphic-unfetch"
import { BASE_URL } from "~/const"

export const scrapeSite = async (endpoint: string) => {
  try {
    const fetchSite = await fetch(`${BASE_URL}${endpoint}`)
    const html = await fetchSite.text()
    const status = fetchSite.status
    const $ = cheerio.load(html)
    return { $, status }
  } catch (e) {
    return Promise.reject(e)
  }
}
