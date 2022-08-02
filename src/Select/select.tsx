import React, { useState, useEffect, createRef } from 'react';
import Classnames from 'classnames';
import SizeType from '../config/size-type';
import { SelectContext } from './context';
import { isOptgroup } from './optgroup';
import { isOption } from './option';

interface ISelectProps {
  sSize?: SizeType;
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & ISelectProps;

const InnerSelect = (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>): JSX.Element => {
  const { sSize, children, ...others } = props;
  const _ref = ref || createRef<HTMLSelectElement>();

  // check children is option or optgroup
  if (!isOptgroup(children) || !isOption(children)) {
    throw new Error('option or optgroup are invalid.');
  }
  return (
    <SelectContext.Provider value={{size: sSize || 'nm'}}>
      <select ref={_ref}>
        {children}
      </select>
    </SelectContext.Provider>
  )
}

const Select = React.forwardRef(InnerSelect);

Select.displayName = 'Select';
Select.defaultProps = {
  sSize: 'nm',
}

export { Select };
