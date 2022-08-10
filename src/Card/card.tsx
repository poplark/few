import React from 'react';
import Classnames from 'classnames';

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: Array<React.ReactNode>;
  type?: 'inner';
  className?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = (props) => {
  const { title, extra, actions, type, className, style, headerStyle, contentStyle, footerStyle, children, ...others } = props;

  const clz = Classnames('card', className);
  const hClz = Classnames('card-header', {'is-inner': type === 'inner'});

  console.log('Card::render::');
  return (
    <div className={clz} style={style}>
      {
        title
          ? (
            <header className={hClz} style={headerStyle}>
              <p className="card-header-title">
                {title}
              </p>
              {
                extra
                  ?  <button className="card-header-icon">{extra}</button>
                  : null
              }
            </header>
          )
          : null
      }
      <div className="card-content" style={contentStyle}>
        {children}
      </div>
      {
        actions
          ? (
           <div className="card-footer" style={footerStyle}>
            { actions.map((action, idx) => <div className="card-footer-item" key={idx}>{action}</div>) }
           </div>
          )
          : null
      }
    </div>
  )
}

Card.displayName = 'Card';
Card.defaultProps = {};
