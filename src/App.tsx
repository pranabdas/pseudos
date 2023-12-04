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
import libNames, {
  findPseudoTypes,
  findPseudoSubTypes,
  findPseudoLibVersions,
  findConfigFile,
  findPath,
} from "./utils";
import DownloadButton from "./DowonloadButton";
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

function App() {
  const [appState, setAppState] = useState<AppState>({
    library: "",
    versions: [],
    selectedVersion: "",
    pseudoTypes: [],
    selectedType: "",
    subTypes: [],
    selectedSubType: "",
  });
  const [inputText, setInputText] = useState("");
  const [psData, setPsData] = useState<string[]>([]);
  const [elementNotFound, setElementNotFound] = useState<string[]>([]);

  const handleSelectLib = (e: SelectChangeEvent) => {
    let library = e.target.value;
    let versions = findPseudoLibVersions(library);

    setAppState({
      ...appState,
      library: library,
      versions: versions,
      selectedVersion: "",
      pseudoTypes: [],
      selectedType: "",
      subTypes: [],
      selectedSubType: "",
    });
    setPsData([]);
    setElementNotFound([]);
  };

  const handleSelectVersion = (e: SelectChangeEvent) => {
    let selectedVersion = e.target.value;
    let pseudoTypes = findPseudoTypes(appState.library, selectedVersion);

    setAppState({
      ...appState,
      selectedVersion: selectedVersion,
      pseudoTypes: pseudoTypes,
      subTypes: [],
      selectedSubType: "",
    });
    setPsData([]);
    setElementNotFound([]);
  };

  const handleSelectType = (e: SelectChangeEvent) => {
    let selectedType = e.target.value;
    let subTypes = findPseudoSubTypes(
      appState.library,
      appState.selectedVersion,
      selectedType
    );

    setAppState({
      ...appState,
      selectedType: selectedType,
      subTypes: subTypes,
      selectedSubType: "",
    });
    setPsData([]);
    setElementNotFound([]);
  };

  const handleSelectSubType = (e: SelectChangeEvent) => {
    let selectedSubType = e.target.value;

    setAppState({ ...appState, selectedSubType: selectedSubType });
    setPsData([]);
    setElementNotFound([]);
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setPsData([]);
    setElementNotFound([]);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let elements = inputText.split(/[\s,]+/);
    elements = elements.filter((x) => x);

    let elementsArr: string[] = [];
    elements.forEach((x) => {
      elementsArr.push(x.charAt(0).toUpperCase() + x.slice(1).toLowerCase());
    });

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

    let psData: string[] = [];
    let el: string[] = [];

    fetch(configFile)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        elementsArr.forEach((element) => {
          if (data.hasOwnProperty(element)) {
            psData.push(
              "https://raw.githubusercontent.com/pranabdas/pseudos/" +
                path +
                data[element]["filename"]
            );
          } else {
            el.push(element);
          }
        });
        setPsData(psData);
        setElementNotFound(el);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h3 style={{ color: "rgb(45, 107, 196)" }}>Pseudopotential Library</h3>
        <hr />
        <br />
        <p>A place to download various pseudopotentials.</p>
        <br />

        {/* Pseudopotential library selection */}
        <>
          <p>Please select Pseudopotential library:</p>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="lib">Library</InputLabel>
              <Select
                labelId="lib"
                id="lib"
                value={appState.library || ""}
                label="lib"
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
        {appState.versions.length > 0 && (
          <>
            <p>Please select Pseudopotential library version:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="type">Version</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={appState.selectedVersion || ""}
                  label="type"
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

        {/* Pseudopotential type selection */}
        {appState.versions.length > 0 && appState.pseudoTypes.length > 0 && (
          <>
            <p>Please select Pseudopotential type:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={appState.selectedType || ""}
                  label="type"
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
        {appState.versions.length > 0 &&
          appState.pseudoTypes.length > 0 &&
          appState.subTypes.length > 0 && (
            <>
              <p>Please select Pseudopotential sub-type:</p>
              <Box sx={{ m: 1, minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="type">Sub-type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    value={appState.selectedSubType || ""}
                    label="type"
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

        {appState.versions.length > 0 &&
          appState.pseudoTypes.length > 0 &&
          appState.selectedSubType !== "" && (
            <>
              <p>
                Enter element names/ chemical symbols (one or more comma or
                space separated):
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

                {inputText !== "" && psData.length === 0 && (
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

        {elementNotFound.length > 0 && (
          <>
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

        {psData.length > 0 && (
          <div style={{ paddingTop: "10px" }}>
            {psData.map((url, index) => (
              <DownloadButton url={url} key={index} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
