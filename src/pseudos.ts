export interface PseudoLibType {
  name: string;
  url: string;
  description: string;
  type: string;
  subType: string;
  version: string;
  path: string;
  config: string;
}

export const pseudoLibs: PseudoLibType[] = [
  {
    name: "SSSP",
    url: "https://www.materialscloud.org/discover/sssp/table/precision",
    description: "A standard solid-state pseudopotentials (SSSP) library.",
    version: "1.3.0",
    type: "PBE",
    subType: "Precision",
    path: "sssp/1.3.0/pbe/precision/",
    config: "SSSP_1.3.0_PBE_precision.json",
  },
  {
    name: "SSSP",
    url: "https://www.materialscloud.org/discover/sssp/table/efficiency",
    description: "A standard solid-state pseudopotentials (SSSP) library.",
    version: "1.3.0",
    type: "PBE",
    subType: "Efficiency",
    path: "sssp/1.3.0/pbe/efficiency/",
    config: "SSSP_1.3.0_PBE_efficiency.json",
  },
];
