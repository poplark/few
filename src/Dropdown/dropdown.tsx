import React, { useRef, useEffect, useCallback } from 'react';
import Classnames from 'classnames';
import { DropdownTrigger } from './dropdown-trigger';
import { DropdownContent } from './dropdown-content';
import { DropdownContext, useDropdownContext } from './context';

interface IDropdownProps {
  active?: boolean;
  trigger?: 'click' | 'hover';
}

export type DropdownProps = React.HTMLAttributes<HTMLElement> & IDropdownProps

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { active, trigger, children } = props;

  const ctx = useDropdownContext(!!active);

  const open = useCallback((evt: React.MouseEvent): void => {
    if (ctx.active) return;
    if (evt.type === trigger || (evt.type === 'mouseenter' && trigger === 'hover')) {
      ctx.triggerActive(true);
    }
  }, [ctx.active, trigger]);
  const close = (evt: React.MouseEvent): void => {
    if (!ctx.active) return;
    if (evt.type === 'mouseleave' && trigger === 'hover') {
      ctx.triggerActive(false);
    }
  };

  const triggerContainerRef = useRef<HTMLDivElement>();
  // todo - 有必要用 memo 吗？？
  const { dropdownTrigger, dropdownContent } = React.useMemo(() => {
    let dropdownTrigger = null;
    let dropdownContent = null;
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        console.warn('Only DropdownTrigger and DropdownContent can be includes, unsupported node: ', child);
        return;
      }
      if (child.type === DropdownTrigger) {
        const originalOnClick = props.onClick;
        const _onClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
          originalOnClick && originalOnClick(evt);
          open(evt);
        }
        // 为 trigger 绑定 onClick 事件，以此来点击显示下拉框
        dropdownTrigger = React.cloneElement(child, Object.assign({}, child.props, {ref: triggerContainerRef, onClick: _onClick}));
      } else if (child.type === DropdownContent) {
        dropdownContent = child;
      } else {
        console.warn('Only DropdownTrigger and DropdownContent can be includes, unsupported element: ', child);
      }
    });
    return { dropdownTrigger, dropdownContent };
  }, [children, open]);

  useEffect(() => {
    const clickHandler = (evt: MouseEvent): void => {
      // ref 引用 trigger 中的容器元素，若不包含事件触发节点，则关闭下拉框
      if (!(triggerContainerRef.current && triggerContainerRef.current.contains(evt.target as Node))) {
        ctx.active && ctx.triggerActive(false);
      }
    }
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    }
  }, [triggerContainerRef, ctx.active]);

  const clz = Classnames('dropdown', {'is-active': ctx.active});

  console.log('Dropdown::render::');

  return (
    <DropdownContext.Provider value={ctx}>
      <div className={clz} onMouseEnter={open} onMouseLeave={close}>
        {dropdownTrigger}
        {dropdownContent}
      </div>
    </DropdownContext.Provider>
  )
}

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
  active: false,
  trigger: 'hover',
}
