import axios from "axios"
import { Agent } from "https"
import { BASE_URL } from "~/const"
import type { ResponseHospitalMap } from "~/types"

const agent = new Agent({ rejectUnauthorized: false })

export const getHospitalMap = async (hospitalid: string): Promise<ResponseHospitalMap> => {
  const data = await axios.get(`${BASE_URL}rumah_sakit/${hospitalid}`, { httpsAgent: agent })
  return Promise.resolve({
    status: data.status,
    data: {
      id: hospitalid,
      name: data.data.data.RUMAH_SAKIT,
      address: data.data.data.ALAMAT,
      lat: data.data.data.alt,
      long: data.data.data.long,
      gmaps: `https://www.google.com/maps/search/?api=1&query=${data.data.alt},${data.data.long}`,
    },
  })
}
