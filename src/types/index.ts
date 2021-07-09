export interface DataProvinces {
  provinces: {
    id: string;
    name: string;
  }[];
}

export interface DataCities {
  cities: {
    id: string;
    name: string;
  }[];
}

export interface ParamHospital {
  type: number;
  provinceid: string;
  cityid: string | number;
}

export interface HospitalsList {
  name: string;
  address: string | null;
  phone: string | null;
  bed_availability: number;
  info: string | null;
  id: string;
  queue: number;
}

export interface ResponseHopitalsList {
  status: number;
  hospitals: HospitalsList[];
}

export interface BedDetail {
  time: string;
  stats: {
    title: string;
    total: number;
    bed_available: number;
    queue: number;
  };
}

export interface ResponseBedDetail {
  status: number;
  data: {
    id: string;
    name: string;
    address: string;
    phone: string | null;
    bedDetail: BedDetail[];
  };
}

export interface ResponseHospitalMap {
  status: number;
  data: {
    id: string;
    address: string;
    name: string;
    lat: string;
    long: string;
    gmaps: string;
  };
}
