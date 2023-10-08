import React, { useState } from 'react';

import { token } from '@atlaskit/tokens';

import { InlineEditableTextfield } from '@atlaskit/inline-edit';

const InlineEdit = ({id,label,editTest}) => {
  const [editValue, setEditValue] = useState(label);

const handleConfirm=value=>{
    setEditValue(value);
    editTest(id,value)
}
  return (
 
      <InlineEditableTextfield
        defaultValue={editValue}
        onConfirm={handleConfirm}
        placeholder="Click to enter text"
        isCompact
        readViewFitContainerWidth={false}
      />
  );
};
export default InlineEdit;