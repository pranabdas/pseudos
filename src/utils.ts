import { pseudoLibs } from "./pseudos";

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

// find config file given library name, version, type, and sub-type
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

// find data base path given library name, version, type, and sub-type
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

export const fileNameFromUrl = (url: string): string => {
  const filename = url.split("/").pop();
  if (filename && filename.length > 0) {
    return filename.charAt(0).toUpperCase() + filename.slice(1);
  }
  return url;
};

export const filterDuplicates = (arr: string[]): string[] => {
  return arr.filter((value, index) => arr.indexOf(value) === index);
};
