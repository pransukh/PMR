export interface LookupItem {
    label: string;
    value: string;
  }

  export interface LookupsResponse {
    genders: LookupItem[];
    bloodGroups: LookupItem[];
    caseTypes: LookupItem[];
    wards: LookupItem[];
    doctors: LookupItem[];
    relations: LookupItem[];
  }