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
  {
    name: "SSSP",
    url: "https://www.materialscloud.org/discover/sssp/table/precision",
    description: "A standard solid-state pseudopotentials (SSSP) library.",
    version: "1.3.0",
    type: "PBEsol",
    subType: "Precision",
    path: "sssp/1.3.0/pbesol/precision/",
    config: "SSSP_1.3.0_PBESOL_precision.json",
  },
  {
    name: "SSSP",
    url: "https://www.materialscloud.org/discover/sssp/table/efficiency",
    description: "A standard solid-state pseudopotentials (SSSP) library.",
    version: "1.3.0",
    type: "PBEsol",
    subType: "Efficiency",
    path: "sssp/1.3.0/pbesol/efficiency/",
    config: "SSSP_1.3.0_PBESOL_efficiency.json",
  },
  {
    name: "GBRV",
    url: "https://www.physics.rutgers.edu/gbrv/",
    description:
      "GBRV high throughput pseudopotentials by Kevin F. Garrity, Joseph W. Bennett, Karin M. Rabe, and David Vanderbilt",
    version: "1.5",
    type: "PBE",
    subType: "Ultra-soft",
    path: "gbrv/1.5/pbe/us/",
    config: "GBRV_1.5_PBE_us.json",
  },
  {
    name: "GBRV",
    url: "https://www.physics.rutgers.edu/gbrv/",
    description:
      "GBRV high throughput pseudopotentials by Kevin F. Garrity, Joseph W. Bennett, Karin M. Rabe, and David Vanderbilt",
    version: "1.5",
    type: "PBEsol",
    subType: "Ultra-soft",
    path: "gbrv/1.5/pbesol/us/",
    config: "GBRV_1.5_PBESOL_us.json",
  },
  {
    name: "GBRV",
    url: "https://www.physics.rutgers.edu/gbrv/",
    description:
      "GBRV high throughput pseudopotentials by Kevin F. Garrity, Joseph W. Bennett, Karin M. Rabe, and David Vanderbilt",
    version: "1.5",
    type: "LDA",
    subType: "Ultra-soft",
    path: "gbrv/1.5/lda/us/",
    config: "GBRV_1.5_LDA_us.json",
  },
  {
    name: "Pseudo dojo (ONCVPSP)",
    url: "http://www.pseudo-dojo.org",
    description: "Pseudo dojo (ONCV) pseudopotentials.",
    version: "0.5",
    type: "Norm-conserving (Scalar Relativistic)",
    subType: "PBE (stringent)",
    path: "dojo/0.5/nc-sr/pbe-stringent/",
    config: "dojo_0.5_nc_sr_pbe_stringent.json",
  },
  {
    name: "Pseudo dojo (ONCVPSP)",
    url: "http://www.pseudo-dojo.org",
    description: "Pseudo dojo (ONCV) pseudopotentials.",
    version: "0.4",
    type: "Norm-conserving (Fully Relativistic)",
    subType: "PBE (stringent)",
    path: "dojo/0.4/nc-fr/pbe-stringent/",
    config: "dojo_0.4_nc_fr_pbe_stringent.json",
  },
  {
    name: "Pseudo dojo (PAW)",
    url: "http://www.pseudo-dojo.org",
    description: "Pseudo dojo (JTH-PAW) pseudopotentials.",
    version: "1.1",
    type: "PAW (JTH)",
    subType: "PBE (stringent)",
    path: "dojo-jth/1.1/paw/pbe-stringent/",
    config: "dojo_jth_1.1_paw_pbe_stringent.json",
  },
];
