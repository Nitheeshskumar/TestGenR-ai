import { CSVLink } from "react-csv";
import ExportIcon from "@atlaskit/icon/glyph/export";
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
        <ExportIcon label="export as csv" />
      </Tooltip>
    </CSVLink>
  );
}
