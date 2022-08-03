import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Menu',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { MenuItem }
} as ComponentMeta<typeof Menu>;

export const Static: ComponentStory<typeof Menu> = () => {
  return (
    <Menu>
      <MenuItem key="1" disabled>第一个</MenuItem>
      <MenuItem key="2" active>第二个</MenuItem>
      <MenuItem key="3">第三个</MenuItem>
    </Menu>
  )
}
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Menu> = (args) => {
  const { onClick, ...others } = args;
  const _onClick = (e: React.MouseEvent, k: string) => {
    console.log('Menu::onClick:: ', e, k)
  }
  return (
    <Menu {...others} onClick={_onClick}>
      <MenuItem key="1" disabled>第一个</MenuItem>
      <MenuItem key="2" active>第二个</MenuItem>
      <MenuItem key="3">第三个</MenuItem>
    </Menu>
  )
};
Dynamic.args = { };
Dynamic.storyName = '动态示例';
