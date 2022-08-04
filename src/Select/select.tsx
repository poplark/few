import React, { useState, useEffect, createRef } from 'react';
import Classnames from 'classnames';
import { ColorType, getColorClass } from '../config/color-type';
import { SizeType, getSizeClass } from '../config/size-type';
import { StateType, getStateClass } from '../config/state-type';
import { SelectContext, useSelectContext } from './context';
import { Option, OptionProps } from './option';

interface SelectProps {
  /**
   * 边框颜色
   */
  color?: ColorType;
  /**
   * 大小
   */
  iSize?: SizeType;
  /**
   * 状态
   */
  state?: StateType;
  disabled?: boolean;
  value?: string | number;
  defaultValue?: string;
  mode?: 'single' | 'multi';
  onChange?: (v: string) => void;
}

const InnerSelect = (props: React.PropsWithChildren<SelectProps>, ref: React.ForwardedRef<HTMLElement>): JSX.Element => {
  const { color, iSize, mode ='single', state, disabled, defaultValue, value, children, onChange, ...others } = props;
  const _ref = ref || createRef<HTMLElement>();

  const [isSingle] = useState(() => mode !== 'multi');
  // check children is option or optgroup
  // if (!isOptgroup(children) || !isOption(children)) {
  //   throw new Error('option or optgroup are invalid.');
  // }

  const kClz = getColorClass(color);
  const sClz = getSizeClass(iSize) || 'is-normal';
  const stClz = getStateClass(state);
  const dClz = disabled ? 'disabled' : '';
  const clz = Classnames('select', kClz, sClz, stClz, dClz);

  const options = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Option) {
      const _child = child as React.ReactElement<OptionProps>;
      return _child.props;
    } else {
      console.warn('not an invalid Option');
    }
  })?.filter((item) => item);

  // todo - 取 defaultValue 还是 value
  const ctx = useSelectContext({size: iSize, mode, values: value || defaultValue, options });

  const renderSelected = (selected: OptionProps[]) => {
    return selected.map((item) => item.title).join('/');
  }

  const renderChild = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child) && child.type === Option) {
      const { props } = child as React.ReactElement<OptionProps>;
      // const originalOnClick = props.onClick;
      const _onClick = (evt: React.MouseEvent): void => {
        console.log('SelectItem::click::', evt.target);
        if (!props.disabled) {
          // originalOnClick && originalOnClick(evt);
          ctx.onSelect(props);
          // todo - 在哪里通知外层
          onChange && onChange(ctx.selected.map((item) => item.value).join('/'));
        }
      }
      return React.cloneElement(child, Object.assign({}, props, { onClick: _onClick }));
    }
    return child;
  }

  return (
    <SelectContext.Provider value={ctx}>
      <div className={clz} {...others}>
        <span className='select-bar'>{renderSelected(ctx.selected)}</span>
        <ul className='select-list'>
          { React.Children.map(children, renderChild) }
        </ul>
      </div>
    </SelectContext.Provider>
  )
}

export const Select = React.forwardRef(InnerSelect);

Select.displayName = 'Select';
Select.defaultProps = {
  color: 'primary',
  iSize: 'normal',
}
