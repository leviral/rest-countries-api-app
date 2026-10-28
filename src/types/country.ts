export type CountryRegion =
  | 'Africa'
  | 'America'
  | 'Antarctic'
  | 'Antarctic Ocean'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Polar';

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital?: string;
  altSpellings?: string[];
  subregion: string;
  region: CountryRegion;
  population: number;
  latlng?: [number, number];
  demonym: string;
  area?: number;
  timezones: string[];
  borders?: string[];
  nativeName: string;
  numericCode: string;
  flags: CountryFlags;
  currencies?: Currency[];
  languages: Language[];
  translations: CountryTranslations;
  flag: string;
  regionalBlocs?: RegionalBloc[];
  cioc?: string;
  independent: boolean;
  gini?: number;
}

export interface CountryFlags {
  svg: string;
  png: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1?: string;
  iso639_2?: string;
  name: string;
  nativeName?: string;
}

export interface CountryTranslations {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa?: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
}

export interface RegionalBloc {
  acronym: string;
  name: string;
  otherNames?: string[];
  otherAcronyms?: string[];
}
