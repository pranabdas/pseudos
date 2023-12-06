import * as React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import libNames, {
  findConfigFile,
  findPath,
  findPseudoLibVersions,
  findPseudoTypes,
  findPseudoSubTypes,
  filterDuplicates,
} from "./utils";
import DownloadButton from "./DownloadButton";
import Footer from "./Footer";

interface AppState {
  library: string;
  versions: string[];
  selectedVersion: string;
  pseudoTypes: string[];
  selectedType: string;
  subTypes: string[];
  selectedSubType: string;
}

const defaultLibrary = libNames.length > 0 ? libNames[0] : "";
const defaultVersion =
  findPseudoLibVersions(defaultLibrary).length > 0
    ? findPseudoLibVersions(defaultLibrary)[0]
    : "";

const defaultType =
  findPseudoTypes(defaultLibrary, defaultVersion).length > 0
    ? findPseudoTypes(defaultLibrary, defaultVersion)[0]
    : "";

const defaultSubType =
  findPseudoSubTypes(defaultLibrary, defaultVersion, defaultType).length > 0
    ? findPseudoSubTypes(defaultLibrary, defaultVersion, defaultType)[0]
    : "";

function App() {
  const [appState, setAppState] = useState<AppState>({
    library: defaultLibrary,
    versions: findPseudoLibVersions(defaultLibrary),
    selectedVersion: defaultVersion,
    pseudoTypes: findPseudoTypes(defaultLibrary, defaultVersion),
    selectedType: defaultType,
    subTypes: findPseudoSubTypes(defaultLibrary, defaultVersion, defaultType),
    selectedSubType: defaultSubType,
  });

  const [inputText, setInputText] = useState("");
  const [pseudoList, setPseudoList] = useState<string[]>([]);
  const [elementNotFound, setElementNotFound] = useState<string[]>([]);

  const handleSelectLib = (e: SelectChangeEvent) => {
    const library = e.target.value;
    const selectedVersion = findPseudoLibVersions(library).includes(
      appState.selectedVersion
    )
      ? appState.selectedVersion
      : findPseudoLibVersions(library).length > 0
      ? findPseudoLibVersions(library)[0]
      : "";

    const selectedType = findPseudoTypes(library, selectedVersion).includes(
      appState.selectedType
    )
      ? appState.selectedType
      : findPseudoTypes(library, selectedVersion).length > 0
      ? findPseudoTypes(library, selectedVersion)[0]
      : "";

    const selectedSubType = findPseudoSubTypes(
      library,
      selectedVersion,
      selectedType
    ).includes(appState.selectedSubType)
      ? appState.selectedSubType
      : findPseudoSubTypes(library, selectedVersion, selectedType).length > 0
      ? findPseudoSubTypes(library, selectedVersion, selectedType)[0]
      : "";

    setAppState({
      ...appState,
      library: e.target.value,
      versions: findPseudoLibVersions(library),
      selectedVersion: selectedVersion,
      pseudoTypes: findPseudoTypes(library, selectedVersion),
      selectedType: selectedType,
      subTypes: findPseudoSubTypes(library, selectedVersion, selectedType),
      selectedSubType: selectedSubType,
    });
    setPseudoList([]);
    setElementNotFound([]);
  };

  const handleSelectVersion = (e: SelectChangeEvent) => {
    const selectedVersion = e.target.value;
    const pseudoTypes = findPseudoTypes(appState.library, selectedVersion);
    const selectedType = pseudoTypes.includes(appState.selectedType)
      ? appState.selectedType
      : pseudoTypes.length > 0
      ? pseudoTypes[0]
      : "";

    const selectedSubType = findPseudoSubTypes(
      appState.library,
      selectedVersion,
      selectedType
    ).includes(appState.selectedSubType)
      ? appState.selectedSubType
      : findPseudoSubTypes(appState.library, selectedVersion, selectedType)
          .length > 0
      ? findPseudoSubTypes(appState.library, selectedVersion, selectedType)[0]
      : "";

    setAppState({
      ...appState,
      selectedVersion: selectedVersion,
      pseudoTypes: pseudoTypes,
      selectedType: selectedType,
      subTypes: findPseudoSubTypes(
        appState.library,
        selectedVersion,
        selectedType
      ),
      selectedSubType: selectedSubType,
    });
    setPseudoList([]);
    setElementNotFound([]);
  };

  const handleSelectType = (e: SelectChangeEvent) => {
    const selectedType = e.target.value;
    const subTypes = findPseudoSubTypes(
      appState.library,
      appState.selectedVersion,
      selectedType
    );

    setAppState({
      ...appState,
      selectedType: selectedType,
      subTypes: subTypes,
      selectedSubType: subTypes.includes(appState.selectedSubType)
        ? appState.selectedSubType
        : subTypes.length > 0
        ? subTypes[0]
        : "",
    });
    setPseudoList([]);
    setElementNotFound([]);
  };

  const handleSelectSubType = (e: SelectChangeEvent) => {
    let selectedSubType = e.target.value;

    setAppState({ ...appState, selectedSubType: selectedSubType });
    setPseudoList([]);
    setElementNotFound([]);
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setPseudoList([]);
    setElementNotFound([]);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let elements = inputText.split(/[\s,]+/);
    elements = elements.filter((x) => x);

    const configFile = findConfigFile(
      appState.library,
      appState.selectedVersion,
      appState.selectedType,
      appState.selectedSubType
    );

    const path = findPath(
      appState.library,
      appState.selectedVersion,
      appState.selectedType,
      appState.selectedSubType
    );

    let pseudoList: string[] = [];
    let notFound: string[] = [];

    fetch(configFile)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        elements.forEach((element) => {
          const elementTitleCase =
            element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
          if (data.hasOwnProperty(elementTitleCase)) {
            pseudoList.push(
              "https://raw.githubusercontent.com/pranabdas/pseudos/" +
                path +
                data[elementTitleCase]["filename"]
            );
          } else {
            notFound.push(element);
          }
        });
        setPseudoList(filterDuplicates(pseudoList));
        setElementNotFound(filterDuplicates(notFound));
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Typography
          variant="h4"
          style={{ color: "rgb(45, 107, 196)", paddingBottom: "6px" }}
        >
          Pseudopotentials
        </Typography>
        <hr />
        <p
          style={{
            fontSize: "1.1em",
            color: "hsl(13, 88%, 68%)",
            paddingTop: "8px",
          }}
        >
          <i>All in one place to find various pseudopotentials.</i>
        </p>
        <br />

        {/* Pseudopotential library selection */}
        <>
          <p>Please select pseudopotential library:</p>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="lib">Library</InputLabel>
              <Select
                labelId="lib"
                id="lib"
                value={appState.library || ""}
                label="Library"
                onChange={handleSelectLib}
              >
                {libNames.map((item, key) => (
                  <MenuItem value={item} key={key}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </>

        {/* Pseudopotential version selection */}
        {appState.versions.length > 0 && appState.library !== "" && (
          <>
            <p>Please select pseudopotential library version:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="version">Version</InputLabel>
                <Select
                  labelId="version"
                  id="version"
                  value={appState.selectedVersion || ""}
                  label="Version"
                  onChange={handleSelectVersion}
                >
                  {appState.versions.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}

        {/* Pseudopotential functional/type selection */}
        {appState.pseudoTypes.length > 0 && appState.selectedVersion !== "" && (
          <>
            <p>Please select pseudopotential functional type:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={appState.selectedType || ""}
                  label="Type"
                  onChange={handleSelectType}
                >
                  {appState.pseudoTypes.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}

        {/* Pseudopotential sub-type selection */}
        {appState.subTypes.length > 0 && appState.selectedType !== "" && (
          <>
            <p>Please select pseudopotential sub-type:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="subtype">Sub-type</InputLabel>
                <Select
                  labelId="subtype"
                  id="subtype"
                  value={appState.selectedSubType || ""}
                  label="Sub-type"
                  onChange={handleSelectSubType}
                >
                  {appState.subTypes.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}

        {appState.selectedSubType !== "" && (
          <>
            <p>
              Enter element names/chemical symbols (one or more, comma or space
              separated):
            </p>
            <Box
              component="form"
              sx={{ m: 1 }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                fullWidth
                id="element"
                label="Element"
                variant="outlined"
                value={inputText || ""}
                placeholder="Fe, O"
                onChange={handleInputText}
              />

              {inputText !== "" && pseudoList.length === 0 && (
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  startDecorator={<SearchIcon />}
                  style={{ marginTop: "10px" }}
                >
                  Find Pseudos
                </Button>
              )}
            </Box>
          </>
        )}

        {/* TODO: provide suggested cutoffs */}
        {pseudoList.length > 0 && (
          <div style={{ paddingTop: "10px" }}>
            {pseudoList.map((url, index) => (
              <DownloadButton url={url} key={index} />
            ))}
          </div>
        )}

        {/* display error */}
        {elementNotFound.length > 0 && (
          <>
            <br />
            <Alert severity="error">
              Pseudopotential {elementNotFound.length > 1 ? "files" : "file"}{" "}
              for{" "}
              <span style={{ color: "red" }}>{elementNotFound.join(", ")}</span>{" "}
              {elementNotFound.length > 1 ? "are" : "is"} not found! Make sure
              you have typed chemical{" "}
              {elementNotFound.length > 1 ? "symbols" : "symbol"} correctly, and
              they are comma or space separated. If your input is correct, you
              may try searching in different library/ version/ type/ sub-type.
            </Alert>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
