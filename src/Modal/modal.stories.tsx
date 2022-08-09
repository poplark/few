import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from './modal';
import { Button } from '../Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Modal',
  component: Modal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Modal>;

export const Static: ComponentStory<typeof Modal> = () => {
  const [visible, setVisible] = useState(false);
  const hide = () => setVisible(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示对话框</Button>
      <Modal title="Modal Demo" visible={visible} okBtn="确认" cancelBtn="取消" onOk={hide} onCancel={hide}>
        一棵小白杨，站在哨所旁
      </Modal>
    </div>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState(false);
  const hide = () => setVisible(false);
  const onOpened = () => {
    console.log('Modal::Opened');
  }
  const onClosed = () => {
    console.log('Modal::Closed');
  }
  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示对话框</Button>
      <Modal title="Modal Demo" visible={visible} {...args} onOk={hide} onCancel={hide} onOpened={onOpened} onClosed={onClosed}>
        一棵小白杨，站在哨所旁
      </Modal>
    </div>
  );
};
Dynamic.args = {
  title: '对话框',
  okBtn: '确认',
  cancelBtn: '取消',
};
Dynamic.storyName = '动态示例';
