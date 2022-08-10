import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './tooltip';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Tooltip>;

export const Static: ComponentStory<typeof Tooltip> = () => {
  return (
    <Tooltip title="这是提示">
      <Button>提示</Button>
    </Tooltip>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args} style={{margin: '100px'}}>
      <Button>提示</Button>
    </Tooltip>
  );
};
Dynamic.args = {
  title: '这是提示',
  placement: 'bottom',
};
Dynamic.storyName = '动态示例';
