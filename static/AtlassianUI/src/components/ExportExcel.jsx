import "./styles.css";
import { CSVLink } from "react-csv";
import ExportIcon from "@atlaskit/icon/glyph/export";
import Tooltip from "@atlaskit/tooltip";

export default function ExportExcel() {
  const headers = [
    { label: "#", key: "no" },
    { label: "Testcase", key: "testcase" },
    { label: "status", key: "status" },
  ];

  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ];

  return (
    <CSVLink data={data} headers={headers}>
      <Tooltip content="Export as csv">
        <ExportIcon label="export as csv" />
      </Tooltip>
    </CSVLink>
  );
}
