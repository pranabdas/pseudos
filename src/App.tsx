import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import libNames, {
  findPseudoTypes,
  findPseudoSubTypes,
  findPseudoLibVersions,
  findConfigFile,
  findPath,
} from "./utils";
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

  const handleSelectLib = (e: SelectChangeEvent) => {
    let selectedLib = e.target.value;
    let pseudoLibVersions = findPseudoLibVersions(selectedLib);

    setSelectedLib(selectedLib);
    setPseudoLibVersions(pseudoLibVersions);
    setSelectedPseudoLibVersion("");
    setPseudoTypes([]);
    setSelectedPseudoType("");
    setPseudoSubTypes([]);
    setSelectedPseudoSubType("")
    setPsData([]);
  };

  const handleSelectVersion = (e: SelectChangeEvent) => {
    let version = e.target.value;
    let pseudoTypes = findPseudoTypes(selectedLib, version);

    setSelectedPseudoLibVersion(version);
    setPseudoTypes(pseudoTypes);
    setPseudoSubTypes([]);
    setSelectedPseudoSubType("")
    setPsData([]);
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
  };

  const handleSelectSubType = (e: SelectChangeEvent) => {
    let selectedSubType = e.target.value;

    setSelectedPseudoSubType(selectedSubType);
    setPsData([]);
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let text = inputText.replace(/\s/g, "");
    let elements = text.split(",");
    elements = elements.filter((x) => x);

    let elementsArr: string[] = [];
    elements.forEach((x) => {
      elementsArr.push(x.charAt(0).toUpperCase() + x.slice(1));
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
          }
        });

        setPsData(psData);
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const fileNameFromUrl = (url: string): string => {
    const filename = url.split("/").pop();
    if (filename && filename.length > 0) {
      return filename.charAt(0).toUpperCase() + filename.slice(1);
    }
    return url;
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h3 style={{ color: "#15847b" }}>Pseudopotential Library</h3>
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

                {inputText !== "" && (
                  <button onClick={handleSubmit} className="btn" type="submit">
                    Find Pseudos
                  </button>
                )}
              </Box>
            </>
          )}

        {psData.length > 0 && (
          <>
            <p>
              You may right-click on the links and select{" "}
              <i>Download/Save Link As</i>.
            </p>
            <ul>
              {psData.map((data, index) => (
                <li key={index}>
                  <a href={data} target="_blank">
                    {fileNameFromUrl(data)}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
