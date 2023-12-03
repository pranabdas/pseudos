import { pseudoLibs } from "./lib_data";

let libNames: string[] = [];
pseudoLibs.forEach((element) => {
  if (!libNames.includes(element.name)) {
    libNames.push(element.name);
  }
});

export default libNames;

// find available versions given pseudo library name
export const findPseudoLibVersions = (name: string): string[] => {
  let result: string[] = [];
  pseudoLibs.forEach((element) => {
    if (element.name === name && !result.includes(element.version)) {
      result.push(element.version);
    }
  });

  return result;
};

// find available pseudo types given library name and version
export const findPseudoTypes = (name: string, version: string): string[] => {
  let result: string[] = [];
  pseudoLibs.forEach((element) => {
    if (
      element.name === name &&
      element.version === version &&
      !result.includes(element.type)
    ) {
      result.push(element.type);
    }
  });

  return result;
};

// find available pseudo sub-types given library name, version, and type
export const findPseudoSubTypes = (
  name: string,
  version: string,
  pseudoType: string
): string[] => {
  let result: string[] = [];
  pseudoLibs.forEach((element) => {
    if (
      element.name === name &&
      element.version === version &&
      element.type === pseudoType &&
      !result.includes(element.subType)
    ) {
      result.push(element.subType);
    }
  });

  return result;
};

export const findConfigFile = (
  name: string,
  version: string,
  pseudoType: string,
  subType: string
): string => {
  for (let i = 0; i < pseudoLibs.length; i++) {
    if (
      pseudoLibs[i].name === name &&
      pseudoLibs[i].version === version &&
      pseudoLibs[i].type === pseudoType &&
      pseudoLibs[i].subType === subType
    ) {
      return "/data/" + pseudoLibs[i].config;
    }
  }

  return "";
};

export const findPath = (
  name: string,
  version: string,
  pseudoType: string,
  subType: string
): string => {
  for (let i = 0; i < pseudoLibs.length; i++) {
    if (
      pseudoLibs[i].name === name &&
      pseudoLibs[i].version === version &&
      pseudoLibs[i].type === pseudoType &&
      pseudoLibs[i].subType === subType
    ) {
      return pseudoLibs[i].path;
    }
  }

  return "";
};
