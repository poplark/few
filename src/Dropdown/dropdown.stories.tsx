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
    <DropdownItem key="1">第一个</DropdownItem>,
    <DropdownItem key="2">第二个</DropdownItem>,
    <DropdownItem key="3">第三个</DropdownItem>,
  ]
  return (
    <Dropdown items={items}>
      <Button>显示下拉框</Button>
    </Dropdown>
  )
}
Static.storyName = '静态示例';

/*
export const Dynamic: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = React.useState('init value');
  const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('demo::select::onChange::', evt.target.value);
    setValue(evt.target.value);
  }
  return (
    <Select value={value} onChange={onChange} {...args}>
      <Optgroup label="第一组">
        <Option>第一个</Option>
        <Option>第二个</Option>
      </Optgroup>
      <Optgroup label="第二组">
        <Option>第一个</Option>
        <Option>第二个</Option>
      </Optgroup>
    </Select>
  )
};
Dynamic.args = {
  color: 'primary',
  iSize: 'large',
  disabled: false,
  defaultValue: 'holder',
};
Dynamic.storyName = '动态示例';
*/
