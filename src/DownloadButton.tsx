import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/joy/IconButton";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { fileNameFromUrl } from "./utils";

export default function DownloadButton({ url }: { url: string }) {
  // make file extension in lowercase for consistency
  let fileName = fileNameFromUrl(url);
  if (fileName.slice(-4).toLocaleLowerCase() === ".upf") {
    fileName = fileName.slice(0, -4) + ".upf";
  }
  const handleClick = () => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const element = document.createElement("a");
        const file = new Blob([blob], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
  };

  const handleCopyFileName = () => {
    navigator.clipboard.writeText(fileName);
  };
  return (
    <Box
      sx={{ display: "flex", gap: 2, alignItems: "center" }}
      style={{ padding: "5px" }}
    >
      <Button
        onClick={handleClick}
        startDecorator={<DownloadIcon />}
        title="Click to download/save file"
      >
        {fileName}
      </Button>
      <IconButton
        onClick={handleCopyFileName}
        aria-label="Copy file name"
        title="Click to copy file name"
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        aria-label="Open in new tab"
        component="a"
        href={url}
        target="_blank"
        title="Open file in new tab"
      >
        <OpenInNew />
      </IconButton>
    </Box>
  );
}
