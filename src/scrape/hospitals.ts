import qs from "query-string"
import { scrapeSite } from "~/utils/scrape-site"
import { capitalizeStr } from "~/utils/capitalize-str"
import type {
  HospitalsList,
  ParamHospital,
  ResponseHopitalsList,
} from "~/types"

export const getHospitalList = async ({
  type,
  provinceid,
  cityid,
}: ParamHospital): Promise<ResponseHopitalsList> => {
  const { $, status } = await scrapeSite(
    `rumah_sakit?jenis=${type}&propinsi=${provinceid}&kabkota=${cityid}`,
  )
  const RE_NUMBER = /\d/
  const hospitals: Array<HospitalsList> = []

  $(".row > .cardRS").each((_, el) => {
    const name: string = $(el).data("string") as string
    const getPhone: string =
      $(el).find(".card-footer > div > span").text().trim().replace(" ", "") ??
      null
    const getAddress: string = $(el)
      .find(
        `${type == 1 ? ".card-body .col-md-7 > p" : ".card-body .col-md-5 > p"}`
      )
      .text()
      .trim()
    const bed_availability: number =
      type == 1
        ? (
          +$(el)
            .find(".card-body .col-md-5 > p > b")
            .text()
            .trim()
        )
        : (
          (+$(el)
            .find('.card-body .col-md-7 .col-md-4:nth-child(1) .card-body > .text-center:nth-child(1)')
            .text()
            .trim()
          ) +
          (+$(el)
            .find('.card-body .col-md-7 .col-md-4:nth-child(2) .card-body > .text-center:nth-child(1)')
            .text()
            .trim()
          ) +
          (+$(el)
            .find('.card-body .col-md-7 .col-md-4:nth-child(3) .card-body > .text-center:nth-child(1)')
            .text()
            .trim()
          )
        )
    const getInfo: string =
      type == 1
        ? (
          $(el)
            .find(".card-body .col-md-5 > p:nth-child(4)")
            .text()
            .trim()
        ) : (
          $(el)
            .find(".card-body .col-md-7 .col-md-4:nth-child(1) .card-footer > .text-center")
            .text()
            .trim()
        )
    const getId: string = ($(el).find(".card-footer > div > a").attr("href") as string)
    const getQueue: string = $(el)
      .find(".card-body .col-md-5 > p:nth-child(3)")
      .text()
      .trim()

    const id: string = Object.values(qs.parse(getId))[0] as string
    const phone: string | null =
      getPhone !== "hotlinetidak tersedia" ? getPhone.replace("-", "") : null
    const address: string | null = getAddress !== "" ? getAddress : null
    const info: string | null = getInfo !== "" ? capitalizeStr(getInfo) : null
    const queue: number = RE_NUMBER.test(getQueue)
      ? +getQueue.replace(/[^\d]/gi, " ")
      : 0

    hospitals.push({
      id,
      name,
      address,
      phone,
      queue,
      bed_availability,
      info
    })
  })
  return {
    status,
    hospitals: hospitals,
  }
}
