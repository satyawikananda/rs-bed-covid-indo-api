import qs from "query-string";
import { scrapeSite } from "~/utils/scrape-site";
import { capitalizeStr } from "~/utils/capitalize-str";
import type {
  HospitalsList,
  ParamHospital,
  ResponseHopitalsList,
} from "~/types";

export const getHospitalList = async ({
  type,
  provinceid,
  cityid,
}: ParamHospital): Promise<ResponseHopitalsList> => {
  const RE_NUMBER = /\d/;
  const hospitals: Array<HospitalsList> = [];
  const { $, status } = await scrapeSite(
    `rumah_sakit?jenis=${type}&propinsi=${provinceid}&kabkota=${cityid}`
  );
  $(".row > .cardRS").each((_, el) => {
    const name: string = $(el).data("string") as string;
    const getAddress: string = $(el)
      .find(".card-body .col-md-7 > p")
      .text()
      .trim();
    const getPhone: string =
      $(el)
        .find(".card-body .col-md-5 > .mt-2.text-right > p:nth-child(4)")
        .text()
        .replace(/[^\d]/gi, " ")
        .trim() ?? null;
    const bed_availability: number = +$(el)
      .find(".card-body .col-md-5 > .mt-2.text-right > p:nth-child(1)")
      .text()
      .replace(/[^\d]/gi, " ");
    const getInfo: string = $(el)
      .find(".card-body .col-md-5 > .mt-2.text-right > p:nth-child(3)")
      .text()
      .trim();
    const getId: string =
      type == 1
        ? ($(el)
            .find(".card-body .col-md-5 > .text-right > a")
            .attr("href") as string)
        : ($(el)
            .find(".card-body .d-inline.mt-1.mb-3 > a")
            .attr("href") as string);
    const getQueue: string = $(el)
      .find(".card-body .col-md-5 > .mt-2.text-right > p:nth-child(2)")
      .text()
      .trim();

    const id: string = Object.values(qs.parse(getId))[0] as string;
    const phone: string | null = getPhone !== "" ? getPhone : null;
    const address: string | null = getAddress !== "" ? getAddress : null;
    const info: string | null = getInfo !== "" ? capitalizeStr(getInfo) : null;
    const queue: number = RE_NUMBER.test(getQueue)
      ? +getQueue.replace(/[^\d]/gi, " ")
      : 0;

    hospitals.push({
      id,
      name,
      address,
      phone,
      bed_availability,
      info,
      queue,
    });
  });
  return {
    status: status,
    hospitals: hospitals,
  };
};
