export interface DataProvinces {
  provinces: {
    id: string
    name: string
  }[]
}

export interface DataCities {
  cities: {
    id: string
    name: string
  }[]
}

export interface ParamHospital {
  type: number
  provinceid: string
  cityid: string | number
}

export interface HospitalsList {
  id: string
  name: string
  address: string | null
  phone: string | null
  bed_availability?: number
  available_beds?: BedsList[] | null
  info: string | null
  queue?: number
}

export interface BedsList {
  available: number
  bed_class: string
  room_name: string
  info: string
}

export interface ResponseHopitalsList {
  status: number
  hospitals: HospitalsList[]
}

export interface BedDetail {
  time: string
  stats: {
    title: string
    bed_empty: number
    bed_available: number
    queue: number
  }
}

export interface ResponseBedDetail {
  status: number
  data: {
    id: string
    name: string
    address: string
    phone: string | null
    bedDetail: BedDetail[]
  }
}

export interface ResponseHospitalMap {
  status: number
  data: {
    id: string
    address: string
    name: string
    lat: string
    long: string
    gmaps: string
  }
}
