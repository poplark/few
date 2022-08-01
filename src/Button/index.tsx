import React from 'react';

type ButtonType = 'default' | 'primary';
type ButtonStatus = 'success' | 'warning' | 'error';

interface ButtonProps {
  type: ButtonType;
  status: ButtonStatus,
  disable: Boolean;
}

export function Button(props: React.ButtonHTMLAttributes<ButtonProps>) {
  const { type, children } = props;

  const clz = `button-${type}`;

  return (
    <button className={clz}>{children}</button>
  )
}
