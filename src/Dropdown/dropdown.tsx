import React, { useRef, useEffect, useCallback } from 'react';
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

  const ctx = useDropdownContext(!!active);

  const open = (evt: React.MouseEvent): void => {
    if (ctx.active) return;
    if (evt.type === trigger ||(evt.type === 'mouseenter' && trigger === 'hover')) {
      ctx.triggerActive(true);
    }
  };
  const close = (evt: React.MouseEvent): void => {
    if (!ctx.active) return;
    if (evt.type === 'mouseleave' && trigger === 'hover') {
      ctx.triggerActive(false);
    }
  };

  let _children = children;
  if (React.isValidElement(children)) {
    const { onClick, ...others } = children.props;
    const _onClick = (evt: React.MouseEvent) => {
      onClick && onClick(evt);
      open(evt);
      // 阻止原生事件的冒泡，防止触发后面 document 对 click 事件监听
      // 但如果页面中已经打开了其他的 dropdown，那么也无法触发那个 dropdown 的关闭了
      // todo -------- 咋办？
      evt.nativeEvent.stopImmediatePropagation();
    }
    _children = React.cloneElement(children, {onClick: _onClick, ...others});
  }

  const ref = useRef(_children);
  useEffect(() => {
    if (trigger !== 'click') return;
    const clickHandler = (evt: MouseEvent): void => {
      // todo - 似乎没用，ref.current 为 ReactNode 肯定不和 evt.target 相同
      console.log('Dropdown::hide::', ref.current);
      if (ref.current !== evt.target) {
        ctx.triggerActive(false);
      }
    }
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, [trigger]);

  const clz = Classnames('dropdown', {'is-active': ctx.active});

  console.log('Dropdown::render::');
  return (
    <DropdownContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close}>
        <div className="dropdown-trigger" onClick={open}>
          {_children}
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
