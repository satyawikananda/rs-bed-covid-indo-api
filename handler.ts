import type { Handler } from "vite-plugin-mix";
import { getProvinces } from "./src/scrape/get-provinces";
import { getCities } from "./src/scrape/get-cities";
import { getHospitalList } from "./src/scrape/hospitals";
import { getBedDetail } from "./src/scrape/bed-detail";
import { getHospitalMap } from "./src/scrape/hospital-map";

export const handler: Handler = async (req, res, next) => {
  if (req.path === "/api/get-provinces") {
    const data = await getProvinces();
    return res.end(JSON.stringify(data));
  }

  if (req.path === "/api/get-cities") {
    const { provinceid } = req.query;
    const data = await getCities(provinceid as string);
    return res.end(JSON.stringify(data));
  }

  if (req.path === "/api/get-hospitals") {
    const { type, provinceid, cityid } = req.query;
    const data = await getHospitalList({
      type: +type as number,
      provinceid: provinceid as string,
      cityid: cityid as string,
    });
    return res.end(JSON.stringify(data));
  }

  if (req.path === "/api/get-bed-detail") {
    const { type, hospitalid } = req.query;
    const data = await getBedDetail(hospitalid as string, +type as number);
    return res.end(JSON.stringify(data));
  }

  if (req.path === "/api/get-hospital-map") {
    const { hospitalid } = req.query;
    const data = await getHospitalMap(hospitalid as string);
    return res.end(JSON.stringify(data));
  }
  next();
};
