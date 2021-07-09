import { scrapeSite } from "~/utils/scrape-site";
import type { BedDetail, ResponseBedDetail } from "~/types";

export const getBedDetail = async (
  hospitalid: string,
  type: number
): Promise<ResponseBedDetail> => {
  const { $, status } = await scrapeSite(
    `/tempat_tidur?kode_rs=${hospitalid}&jenis=${type}`
  );
  const bedDetail: Array<BedDetail> = [];

  const name: string = $(".col-md-12.mb-2 > h3").text().trim();
  const address: string = $(".col-md-12.mb-2 > div:nth-child(2)").text().trim();
  const phone: string =
    $(".col-md-12.mb-2 > div:nth-child(3)").text().trim() ?? null;
  $(".card").each((_, el) => {
    const time: string = $(el)
      .find(".card-header > div > .ml-auto.mt-1")
      .text()
      .trim();
    const title: string = $(el)
      .find(".card-body > h5:nth-child(1)")
      .text()
      .trim();
    const total: number = +$(el)
      .find(
        ".card-body > .col-md-12 > .row > div:nth-child(1) > div > div > h1"
      )
      .text()
      .trim();
    const bedAvailable: number = +$(el)
      .find(
        ".card-body > .col-md-12 > .row > div:nth-child(2) > div > div > h1"
      )
      .text()
      .trim();
    const queueBed: number = +$(el)
      .find(
        ".card-body > .col-md-12 > .row > div:nth-child(3) > div > div > h1"
      )
      .text()
      .trim();

    bedDetail.push({
      time,
      stats: {
        title,
        total,
        bed_available: bedAvailable,
        queue: queueBed,
      },
    });
  });
  return {
    status: status,
    data: {
      id: hospitalid,
      name,
      address,
      phone,
      bedDetail,
    },
  };
};
