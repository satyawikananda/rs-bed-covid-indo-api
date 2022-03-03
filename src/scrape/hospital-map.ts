import fetch from "node-fetch"
import { Agent } from "https"
import { BASE_URL } from "~/const"
import type { ResponseHospitalMap } from "~/types"

const agent = new Agent({ rejectUnauthorized: false })

export const getHospitalMap = async (hospitalid: string): Promise<ResponseHospitalMap> => {
  const fetchData = await fetch(`${BASE_URL}rumah_sakit/${hospitalid}`, { agent })
  const data: any = await fetchData.json()
  return Promise.resolve({
    status: fetchData.status,
    data: {
      id: hospitalid,
      name: data.data.RUMAH_SAKIT,
      address: data.data.ALAMAT,
      lat: data.data.alt,
      long: data.data.long,
      gmaps: `https://www.google.com/maps/search/?api=1&query=${data.data.alt},${data.data.long}`,
    },
  })
}
