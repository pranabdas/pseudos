import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/joy/IconButton";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { fileNameFromUrl } from "./utils";

export default function DownloadButton({ url }: { url: string }) {
  const handleClick = () => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const element = document.createElement("a");
        const file = new Blob([blob], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = fileNameFromUrl(url);
        document.body.appendChild(element);
        element.click();
      })
      .catch((e: Error) => {
        console.log(e.message);
      });
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
        {fileNameFromUrl(url)}
      </Button>
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
