import React, { useContext, useRef, useEffect } from 'react';
import Classnames from 'classnames';
import { PopoverContext } from './context';

export interface PopoverTriggerProps {
  className?: string;
}

export const PopoverTrigger: React.FC<React.PropsWithChildren<PopoverTriggerProps>> = (props) => {
  const { className, children, ...others } = props;
  const clz = Classnames('dropdown-trigger', className);
  const ctx = useContext(PopoverContext);

  const onClick = (evt: React.MouseEvent) => {
    if (ctx.trigger !== 'click') return;
    if (ctx.visible) return;
    ctx.triggerVisible(true);
  }
  const onFocus = (evt: React.FocusEvent) => {
    if (ctx.trigger !== 'focus') return;
    if (ctx.visible) return;
    ctx.triggerVisible(true);
  }
  const onBlur = (evt: React.FocusEvent) => {
    if (ctx.trigger !== 'focus') return;
    if (!ctx.visible) return;
    ctx.triggerVisible(false);
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (evt: MouseEvent): void => {
      // ref 引用 trigger 中的容器元素，若不包含事件触发节点，则关闭下拉框
      if (
        !(
          ref.current &&
          ref.current.contains(evt.target as Node)
        )
      ) {
        ctx.visible && ctx.triggerVisible(false);
      }
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [ref.current, ctx.visible, ctx.trigger]);

  console.log('PopoverTrigger::render::');
  return (
    <div className={clz} onClick={onClick} onFocus={onFocus} onBlur={onBlur} ref={ref} {...others}>
      {children}
    </div>
  );
};

PopoverTrigger.displayName = 'PopoverTrigger';
