import React, { PropsWithChildren } from 'react';
import Classnames from 'classnames';

export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
}

export const TabPane: React.FC<PropsWithChildren<TabPaneProps>> = (props) => {
  const { active, className, style, children } = props;
  const clz = Classnames('tab-pane', active ? 'is-active' : '', className);
  console.log('TabPane::render::');
  return (
    <div className={clz} style={style}>
      {children}
    </div>
  )
}
