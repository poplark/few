import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Dropdown } from './dropdown';
import { DropdownTrigger } from './dropdown-trigger';
import { DropdownContent } from './dropdown-content';
import { Menu } from '../Menu/menu';
import { MenuItem } from '../Menu/menu-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { DropdownTrigger, DropdownContent },
} as ComponentMeta<typeof Dropdown>;

export const Static: ComponentStory<typeof Dropdown> = () => {
  return (
    <Dropdown visible={true}>
      <DropdownTrigger>
        <Button>显示下拉框</Button>
      </DropdownTrigger>
      <DropdownContent>
        <Menu>
          <MenuItem key="1">第一个</MenuItem>
          <MenuItem key="2">第二个</MenuItem>
          <MenuItem key="3">第三个</MenuItem>
        </Menu>
      </DropdownContent>
    </Dropdown>
  );
};
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Dropdown> = (args) => {
  return (
    <Dropdown {...args}>
      <DropdownTrigger>
        <Button>显示下拉框</Button>
      </DropdownTrigger>
      <DropdownContent>
        <Menu>
          <MenuItem key="1">第一个</MenuItem>
          <MenuItem key="2">第二个</MenuItem>
          <MenuItem key="3">第三个</MenuItem>
          <MenuItem key="4">第三个</MenuItem>
        </Menu>
      </DropdownContent>
    </Dropdown>
  );
};
Dynamic.args = {
  visible: false,
  trigger: 'click',
};
Dynamic.storyName = '动态示例';
