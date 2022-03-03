import fetch from "node-fetch"
import { Agent } from "https"
import type { DataCities } from "~/types"
import { BASE_URL } from "~/const"

const agent = new Agent({ rejectUnauthorized: false })

export const getCities = async (provinceId: string): Promise<DataCities> => {
  const fetchData = await fetch(`${BASE_URL}Kabkota?kode_propinsi=${provinceId}`, { agent })
  const data: any = await fetchData.json()
  return Promise.resolve({
    cities: data.data.map((data: any) => ({
      id: data.kode_kabkota,
      name: data.nama_kabkota,
    })),
  })
}
