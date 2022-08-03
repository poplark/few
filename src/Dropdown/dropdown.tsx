import React, { useCallback } from 'react';
import Classnames from 'classnames';
import { Button } from '../Button';
import { DropdownItem, DropdownItemSchema } from './dropdown-item';
import { DropdownContext, useDropdownContext } from './context';

interface IDropdownProps {
  active?: boolean;
  trigger?: 'click' | 'hover';
  items: Array<DropdownItemSchema>;
}

export type DropdownProps = React.HTMLAttributes<HTMLElement> & IDropdownProps

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { active, trigger, items, children } = props;
  console.log('Dropdown::props::', active, trigger, items);

  for (const item of items || []) {
    console.log('items::item::', item);
  }
  const ctx = useDropdownContext(!!active);

  const open = (evt: React.MouseEvent): void => {
    console.log('Dropdown::open::', evt.type);
    if (ctx.active) return;
    if (evt.type === trigger ||(evt.type === 'mouseenter' && trigger === 'hover')) {
      ctx.triggerActive(true);
    }
  }
  const close = (evt: React.MouseEvent): void => {
    console.log('Dropdown::close::', evt.type);
    if (!ctx.active) return;
    if (evt.type === 'mouseleave' && trigger === 'hover') {
      ctx.triggerActive(false);
    }
  }
  // todo - 监听 document，点击其他区域时隐藏下拉框

  const clz = Classnames('dropdown', {'is-active': ctx.active});

  console.log('Dropdown::render::');
  return (
    <DropdownContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close}>
        <div className="dropdown-trigger" onClick={open}>
          {children}
        </div>
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {
              items.map((item) => (<DropdownItem {...item}/>))
            }
          </div>
        </div>
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
  active: false,
  trigger: 'hover',
}
