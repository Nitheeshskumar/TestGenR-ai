import { CSVLink } from "react-csv";
import MediaServicesSpreadsheetIcon from "@atlaskit/icon/glyph/media-services/spreadsheet";
import Tooltip from "@atlaskit/tooltip";

export default function ExportExcel({ testCases }) {
  const headers = [
    { label: "#", key: "id" },
    { label: "Testcase", key: "testcase" },
    { label: "Status", key: "status" },
  ];

  return (
    <CSVLink data={testCases} headers={headers}>
      <Tooltip content="Export as csv">
        <MediaServicesSpreadsheetIcon label="export as csv" primaryColor="rgb(66, 82, 110)" />
      </Tooltip>
    </CSVLink>
  );
}
