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

function App() {
  const [selectedLib, setSelectedLib] = useState("");
  const [pseudoLibVersions, setPseudoLibVersions] = useState<string[]>([]);
  const [selectedPseudoLibVersion, setSelectedPseudoLibVersion] = useState("");
  const [pseudoTypes, setPseudoTypes] = useState<string[]>([]);
  const [selectedPseudoType, setSelectedPseudoType] = useState("");
  const [pseudoSubTypes, setPseudoSubTypes] = useState<string[]>([]);
  const [selectedPseudoSubType, setSelectedPseudoSubType] = useState("");
  const [inputText, setInputText] = useState("");
  const [psData, setPsData] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectLib = (e: SelectChangeEvent) => {
    let selectedLib = e.target.value;
    let pseudoLibVersions = findPseudoLibVersions(selectedLib);

    setSelectedLib(selectedLib);
    setPseudoLibVersions(pseudoLibVersions);
    setSelectedPseudoLibVersion("");
    setPseudoTypes([]);
    setSelectedPseudoType("");
    setPseudoSubTypes([]);
    setSelectedPseudoSubType("");
    setPsData([]);
    setErrorMessage("");
  };

  const handleSelectVersion = (e: SelectChangeEvent) => {
    let version = e.target.value;
    let pseudoTypes = findPseudoTypes(selectedLib, version);

    setSelectedPseudoLibVersion(version);
    setPseudoTypes(pseudoTypes);
    setPseudoSubTypes([]);
    setSelectedPseudoSubType("");
    setPsData([]);
    setErrorMessage("");
  };

  const handleSelectType = (e: SelectChangeEvent) => {
    let selectedType = e.target.value;
    let pseudoSubTypes = findPseudoSubTypes(
      selectedLib,
      selectedPseudoLibVersion,
      selectedType
    );

    setSelectedPseudoType(selectedType);
    setPseudoSubTypes(pseudoSubTypes);
    setPsData([]);
    setErrorMessage("");
  };

  const handleSelectSubType = (e: SelectChangeEvent) => {
    let selectedSubType = e.target.value;

    setSelectedPseudoSubType(selectedSubType);
    setPsData([]);
    setErrorMessage("");
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setPsData([]);
    setErrorMessage("");
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let text = inputText.replace(/\s/g, "");
    let elements = text.split(",");
    elements = elements.filter((x) => x);

    let elementsArr: string[] = [];
    elements.forEach((x) => {
      elementsArr.push(x.charAt(0).toUpperCase() + x.slice(1).toLowerCase());
    });

    const configFile = findConfigFile(
      selectedLib,
      selectedPseudoLibVersion,
      selectedPseudoType,
      selectedPseudoSubType
    );

    const path = findPath(
      selectedLib,
      selectedPseudoLibVersion,
      selectedPseudoType,
      selectedPseudoSubType
    );

    let psData: string[] = [];

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
            setErrorMessage(
              "One or more pseudopotential files are not found! Make sure you have typed chemical symbol(s) correctly and they are comma separated. If your input is correct, you may try searching in different library/ version/ type/ sub-type."
            );
          }
        });
        setPsData(psData);
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
                value={selectedLib || ""}
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
        {pseudoLibVersions.length > 0 && (
          <>
            <p>Please select Pseudopotential library version:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="type">Version</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={selectedPseudoLibVersion || ""}
                  label="type"
                  onChange={handleSelectVersion}
                >
                  {pseudoLibVersions.map((item, key) => (
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
        {pseudoLibVersions.length > 0 && pseudoTypes.length > 0 && (
          <>
            <p>Please select Pseudopotential type:</p>
            <Box sx={{ m: 1, minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={selectedPseudoType || ""}
                  label="type"
                  onChange={handleSelectType}
                >
                  {pseudoTypes.map((item, key) => (
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
        {pseudoLibVersions.length > 0 &&
          pseudoTypes.length > 0 &&
          pseudoSubTypes.length > 0 && (
            <>
              <p>Please select Pseudopotential sub-type:</p>
              <Box sx={{ m: 1, minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="type">Sub-type</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    value={selectedPseudoSubType || ""}
                    label="type"
                    onChange={handleSelectSubType}
                  >
                    {pseudoSubTypes.map((item, key) => (
                      <MenuItem value={item} key={key}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}

        {pseudoLibVersions.length > 0 &&
          pseudoTypes.length > 0 &&
          selectedPseudoSubType !== "" && (
            <>
              <p>
                Enter element names/ chemical symbols (one or more comma
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

        {errorMessage !== "" && (
          <>
            <Alert severity="error">{errorMessage}</Alert>
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
