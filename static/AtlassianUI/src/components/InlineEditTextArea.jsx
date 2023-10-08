
import { useState } from 'react';

import { jsx } from '@emotion/react';

import { Box, xcss } from '@atlaskit/primitives';
import TextArea from '@atlaskit/textarea';
import { token } from '@atlaskit/tokens';
import { Checkbox } from '@atlaskit/checkbox';
import {
  fontSize as getFontSize
} from '@atlaskit/theme/constants';

import InlineEdit from '@atlaskit/inline-edit';

const containerStyles = xcss({
//   paddingTop: 'space.100',
//   paddingRight: 'space.100',
//   paddingBottom: 'space.600',
  width: '100%',
});

const fontSize = getFontSize();
const gridSize = token('space.100', '8px');
const minRows = 2;
const textAreaLineHeightFactor = 2.5;

const readViewContainerStyles = xcss({
  minHeight: `${gridSize * textAreaLineHeightFactor * minRows}px`,
  padding: 'space.075',
  lineHeight: `${(gridSize * textAreaLineHeightFactor) / fontSize}`,
  wordBreak: 'break-word',
});

const InlineEditCustomTextarea = ({id,label,isChecked,children}) => {

  const [editValue, setEditValue] = useState(label);
const checkBoxlabel=()=>{
    <>
    {label} {children}</>
}
const toggleChecked=event=>{
    console.log('checked',event)
}
  return (
    <Box xcss={containerStyles}>
      <InlineEdit
        defaultValue={editValue}
        editView={({ errorMessage, ...fieldProps }, ref) => (
          // @ts-ignore - textarea does not pass through ref as a prop
          <TextArea {...fieldProps} ref={ref} />
        )}
        readView={() => (
          <Box xcss={readViewContainerStyles}>
           <Checkbox isChecked={isChecked} onChange={toggleChecked} label={label} />
          {children}
          </Box>
        )}
        onConfirm={setEditValue}
        keepEditViewOpenOnBlur
        readViewFitContainerWidth
      />
    </Box>
  );
};

export default InlineEditCustomTextarea;