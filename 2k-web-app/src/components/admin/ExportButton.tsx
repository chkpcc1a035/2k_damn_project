import { Button } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

const convertToCSV = (objArray: object[]): string => {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";
  let header = "";

  // Extract headers
  if (array.length > 0) {
    header = Object.keys(array[0]).join(",") + "\r\n";
  }

  // Extract content
  const content = array
    .map((row: any) => {
      return Object.values(row)
        .map((value: any) => `"${value.toString().replace(/"/g, '""')}"`)
        .join(",");
    })
    .join("\r\n");

  str += header + content;
  return str;
};

const downloadCSV = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function ExportButton({ data }: { data: any }) {
  const handleDownload = () => {
    const csvData = convertToCSV(data);
    downloadCSV(csvData, "data.csv");
  };
  return (
    <Button
      leftSection={<IconFile />}
      variant="default"
      onClick={handleDownload}
    >
      Export
    </Button>
  );
}
