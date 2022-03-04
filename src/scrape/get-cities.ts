import axios from "axios"
import { Agent } from "https"
import type { DataCities } from "~/types"
import { BASE_URL } from "~/const"

const agent = new Agent({ rejectUnauthorized: false })

export const getCities = async (provinceId: string): Promise<DataCities> => {
  const { data } = await axios.get(`${BASE_URL}Kabkota?kode_propinsi=${provinceId}`, {
    httpsAgent: agent,
  })
  return Promise.resolve({
    cities: data.data.map((data: any) => ({
      id: data.kode_kabkota,
      name: data.nama_kabkota,
    })),
  })
}
