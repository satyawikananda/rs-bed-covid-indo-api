import { scrapeSite } from "~/utils/scrape-site"
import type { BedDetail, ResponseBedDetail } from "~/types"

export const getBedDetail = async (
  hospitalid: string,
  type: number,
): Promise<ResponseBedDetail> => {
  const { $, status } = await scrapeSite(
    `/tempat_tidur?kode_rs=${hospitalid}&jenis=${type}`,
  )
  const bedDetail: Array<BedDetail> = []

  const address: string = $(".col-11.col-md-11 > p > small:nth-child(2)")
    .text()
    .trim()
  const phone: string =
    $(".col-11.col-md-11 > p > small:nth-child(4)").text().trim() ?? null
  const name: string = $(".col-11.col-md-11 > p")
    .text()
    .trim()
    .replace(address, "")
    .replace(phone, "")
    .trim()
  $(".col-md-12.mb-2 ").each((_, el) => {
    const time: string = $(el)
      .find(
        ".card > .card-body > .row > .col-md-6.col-12:nth-child(1) > p.mb-0 > small",
      )
      .text()
      .trim()
      .replace("Update", "")
    const title: string = $(el)
      .find(
        ".card > .card-body > .row > .col-md-6.col-12:nth-child(1) > p.mb-0",
      )
      .text()
      .trim()
      .replace(time, "")
      .replace("Update", "")
      .trim()
    const bedAvailable: number = +$(el)
      .find(
        ".card > .card-body > .row > .col-md-6.col-12:nth-child(2)  .col-md-4.col-4:nth-child(1) > div.text-center.pt-1.pb-1 > div:nth-child(2)",
      )
      .text()
      .trim()
    const bed_empty: number = +$(el)
      .find(
        ".card > .card-body > .row > .col-md-6.col-12:nth-child(2) .col-md-4.col-4:nth-child(2) > div.text-center.pt-1.pb-1 > div:nth-child(2)",
      )
      .text()
      .trim()
    const queueBed: number = +$(el)
      .find(
        ".card > .card-body > .row > .col-md-6.col-12:nth-child(2) .col-md-4.col-4:nth-child(3) > div.text-center.pt-1.pb-1 > div:nth-child(2)",
      )
      .text()
      .trim()

    bedDetail.push({
      time,
      stats: {
        title,
        bed_available: bedAvailable,
        bed_empty,
        queue: queueBed,
      },
    })
  })
  return {
    status: status,
    data: {
      id: hospitalid,
      name,
      address,
      phone,
      bedDetail,
    },
  }
}
