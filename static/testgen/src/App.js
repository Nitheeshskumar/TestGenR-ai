import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "./App.css";
import CustomizedDialogs from "./components/Modal";

function App() {
  const [isOpen, setOpen] = useState(false);
  const [eachTCEntry, setEachTCEntry] = useState({});

  const sample = [
    {
      id: "01",
      test_case: "Verifyy that the button is placed at the lower end of the screen.",
      status: "Completed",
    },
    {
      id: "02",
      test_case: "Verify that the button text is 'Click me'.",
      status: "Not completed",
    },
    {
      id: "02",
      test_case: "Verify that the button text is 'Click me'.",
      status: "Not completed",
    },
    {
      id: "02",
      test_case: "Verify that the button text is 'Click me'.",
      status: "Not completed",
    },
  ];

  const openModal = (entry) => {
    setOpen(true);
    setEachTCEntry(entry);
  };
  const handleClose = (entry) => {};

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const modal = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    transform: "translate(0, 0)",
  };

  useEffect(() => {}, []);
  // const triggered = () => {
  //   console.log(document.getElementsByClassName("MuiModal-root"));
  //   const modal = document.getElementsByClassName("MuiModal-root"); // Replace with your modal's ID
  //   const parentWindow = window.parent;

  //   const parentWidth = parentWindow.innerWidth || parentWindow.document.documentElement.clientWidth;
  //   const parentHeight = parentWindow.innerHeight || parentWindow.document.documentElement.clientHeight;

  //   const modalWidth = modal.offsetWidth;
  //   const modalHeight = modal.offsetHeight;

  //   const leftOffset = (parentWidth - modalWidth) / 2;
  //   const topOffset = (parentHeight - modalHeight) / 2;

  //   modal.style.left = leftOffset + "px";
  //   modal.style.top = topOffset + "px";
  // };
  return (
    <><CustomizedDialogs/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell align="right">Test case</TableCell>
              <TableCell align="right">Status</TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sample.map((entry) => (
              <TableRow key={entry.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {entry.id}
                </TableCell>
                <TableCell align="right" onClick={() => openModal(entry)}>
                  {entry.test_case}
                </TableCell>
                <TableCell align="right">{entry.status}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={modal}
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default App;
