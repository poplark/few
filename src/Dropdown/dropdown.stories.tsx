import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import { Dropdown } from './dropdown';
import { DropdownItem } from './dropdown-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  subcomponents: { DropdownItem }
} as ComponentMeta<typeof Dropdown>;

export const Static: ComponentStory<typeof Dropdown> = () => {
  const items = [
    {
      key: '1',
      label: '第一个',
      active: false,
    }, {
      key: '2',
      label: '第二个',
      active: false,
    }, {
      key: '3',
      label: '第三个',
      active: false,
    }
  ]
  return (
    <Dropdown items={items} active={true}>
      <Button>显示下拉框</Button>
    </Dropdown>
  )
}
Static.storyName = '静态示例';

export const Dynamic: ComponentStory<typeof Dropdown> = (args) => {
  const { items, ...others } = args;
  const _items = [
    {
      key: '1',
      label: '第一个',
      active: false,
    }, {
      key: '2',
      label: '第二个',
      active: false,
    }, {
      key: '3',
      label: '第三个',
      active: false,
    }
  ];
  return (
    <Dropdown items={_items} {...others}>
      <Button>显示下拉框</Button>
    </Dropdown>
  )
};
Dynamic.args = {
  active: false,
  trigger: 'click',
};
Dynamic.storyName = '动态示例';
