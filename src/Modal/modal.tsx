import React, { useEffect } from 'react';
import Classnames from 'classnames';
import { Button } from '../Button';
import { Icon } from '../Icon';

export interface ModalProps {
  title?: React.ReactNode;
  okBtn?: React.ReactNode;
  cancelBtn?: React.ReactNode;
  visible?: boolean;
  className?: string;
  closable?: boolean;
  mask?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onOpened?: () => void;
  onClosed?: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = (props) => {
  const { title, okBtn, cancelBtn, visible, className, closable, mask, onOk, onCancel, onOpened, onClosed, children, ...others } = props;

  useEffect(() => {
    if (!visible) {
      onClosed && onClosed();
    } else {
      onOpened && onOpened();
    }
  }, [visible]);

  const _onOk = () => {
    if (!visible) return;
    onOk && onOk();
  };
  const _onCancel = () => {
    if (!visible) return;
    onCancel && onCancel();
  };

  const clz = Classnames('modal', {
    'is-active': visible,
  }, className);

  const renderFooter = () => {
    if (!okBtn && !cancelBtn) {
      return null;
    }
    let _okBtn: React.ReactElement;
    if (React.isValidElement(okBtn)) {
      _okBtn = React.cloneElement(okBtn, Object.assign({}, okBtn.props, {onClick: _onOk}));
    } else {
      _okBtn = <Button kind="primary" onClick={_onOk}>{okBtn}</Button>;
    }
    let _cancelBtn: React.ReactElement;
    if (React.isValidElement(cancelBtn)) {
      _cancelBtn = React.cloneElement(cancelBtn, Object.assign({}, cancelBtn.props, {onClick: _onCancel}));
    } else {
      _cancelBtn = <Button onClick={_onCancel}>{cancelBtn}</Button>;
    }
    return <div className="modal-footer">{_okBtn}{_cancelBtn}</div>;
  }

  return (
    <div className={clz} {...others}>
      { mask ? <div className="modal-background"></div> : null }
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-header-title">
            {title}
          </span>
          { closable ? <Icon className="modal-header-icon" type="close" onClick={_onCancel}/> : null}
        </div>
        <div className="modal-body">
          {children}
        </div>
        { renderFooter() }
      </div>
    </div>
  )
}
Modal.displayName = 'Modal';
Modal.defaultProps = {
  title: '',
  visible: false,
  closable: true,
  mask: true,
}
