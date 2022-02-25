import fetch from "isomorphic-unfetch"
import type { DataCities } from "~/types"
import { BASE_URL } from "~/const"

export const getCities = async (provinceId: string): Promise<DataCities> => {
  const fetchData = await fetch(`${BASE_URL}Kabkota?kode_propinsi=${provinceId}`)
  const data = await fetchData.json()
  return Promise.resolve({
    cities: data.data.map((data: any) => ({
      id: data.kode_kabkota,
      name: data.nama_kabkota,
    })),
  })
}
