import { useState } from "react";
import { Box, xcss } from "@atlaskit/primitives";
import TextArea from "@atlaskit/textarea";
import { token } from "@atlaskit/tokens";
import { Checkbox } from "@atlaskit/checkbox";
import { fontSize as getFontSize } from "@atlaskit/theme/constants";

import InlineEdit from "@atlaskit/inline-edit";

const containerStyles = xcss({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
});

const fontSize = getFontSize();
const gridSize = token("space.100", "8px");
const minRows = 2;
const textAreaLineHeightFactor = 2.5;

const readViewContainerStyles = xcss({
  minHeight: `${gridSize * textAreaLineHeightFactor * minRows}px`,
  padding: "space.075",
  lineHeight: `${(gridSize * textAreaLineHeightFactor) / fontSize}`,
  wordBreak: "break-word",
});
const innerBox = xcss({
  display: "flex",
  alignItems: "end",
  marginTop: "-12px",
  marginLeft: "8px",
});
const InlineEditCustomTextarea = ({ id, label, isChecked, children, toggleChecked, editTest }) => {
  const [isEditing, setEditing] = useState(false);
  const checkBoxlabel = () => {
    return <span onClick={() => setEditing(true)}>{label}</span>;
  };
  const handleTextChange = (value) => {
    editTest(id, value);
    setEditing(false);
  };

  return (
    <Box xcss={containerStyles}>
      <Box xcss={innerBox}>
        <Checkbox
          isChecked={isChecked}
          onChange={() => toggleChecked(id)}
          // label={checkBoxlabel()}
        />
        <InlineEdit
          defaultValue={label}
          editView={({ errorMessage, ...fieldProps }, ref) => (
            // @ts-ignore - textarea does not pass through ref as a prop
            <TextArea {...fieldProps} ref={ref} />
          )}
          readView={() => <Box xcss={readViewContainerStyles}>{checkBoxlabel()}</Box>}
          // onConfirm={setEditValue}
          keepEditViewOpenOnBlur
          readViewFitContainerWidth
          isEditing={isEditing}
          onCancel={() => setEditing(false)}
          onConfirm={handleTextChange}
          isRequired
          // onEdit={() => setEditing(true)}
        />
      </Box>
      {children}
    </Box>
  );
};

export default InlineEditCustomTextarea;
