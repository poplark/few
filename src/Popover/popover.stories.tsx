import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Popover } from './popover';
import { PopoverTrigger } from './popover-trigger';
import { PopoverContent } from './popover-content';
import { Menu } from '../Menu/menu';
import { MenuItem } from '../Menu/menu-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Popover',
  component: Popover,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { PopoverTrigger, PopoverContent },
} as ComponentMeta<typeof Popover>;

export const Static: ComponentStory<typeof Popover> = () => {
  return (
    <Popover visible={true}>
      <PopoverTrigger>
        <Button>显示下拉框</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Menu>
          <MenuItem key="1">第一个</MenuItem>
          <MenuItem key="2">第二个</MenuItem>
          <MenuItem key="3">第三个</MenuItem>
        </Menu>
      </PopoverContent>
    </Popover>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Popover> = (args) => {
  return (
    <Popover {...args}>
      <PopoverTrigger>
        <Button>显示下拉框</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Menu>
          <MenuItem key="1">第一个</MenuItem>
          <MenuItem key="2">第二个</MenuItem>
          <MenuItem key="3">第三个</MenuItem>
          <MenuItem key="4">第三个</MenuItem>
        </Menu>
      </PopoverContent>
    </Popover>
  );
};
Dynamic.args = {
  visible: false,
  trigger: 'click',
};
Dynamic.storyName = '动态示例';
