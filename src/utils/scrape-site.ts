import cheerio from "cheerio"
import axios from "axios"
import { Agent } from "https"
import { BASE_URL } from "~/const"

const agent = new Agent({ rejectUnauthorized: false })

export const scrapeSite = async (endpoint: string) => {
  try {
    const fetchSite = await axios.get(`${BASE_URL}${endpoint}`, { httpsAgent: agent })
    const html = await fetchSite.data
    const status = fetchSite.status
    const $ = cheerio.load(html)
    return { $, status }
  } catch (e) {
    return Promise.reject(e)
  }
}
