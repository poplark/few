import React, { useState } from 'react';
import { Button } from '@/Button';
import { Menu, MenuItem } from '@/Menu';
import { Dropdown, DropdownTrigger, DropdownContent } from '@/Dropdown';

// 由于 Dropdown 内部没想到好的处理方式，setV 会触发 Menu 的 re-render。
// 目前想到这样可以，还有下面用 React.useMemo 的方式也可以
// const Dropdown = React.memo(OriginDropdown, () => true);
export default function App() {
  const [v, setV] = useState(0);
  const handleClick = () => {
    setV(v + 1);
  };
  const dropdown = (
    // const dropdown = React.useMemo(() => (
    <Dropdown>
      <DropdownTrigger>
        <Button color="default">hi dropdown</Button>
      </DropdownTrigger>
      <DropdownContent>
        <Menu>
          <MenuItem key="1">一</MenuItem>
          <MenuItem key="2">二</MenuItem>
          <MenuItem key="3">三</MenuItem>
          <MenuItem key="4" onClick={() => setV(4)}>
            将 v 置为 4
          </MenuItem>
        </Menu>
      </DropdownContent>
    </Dropdown>
    // ), []);
  );
  return (
    <div>
      <div>Hello world. v: {v} </div>
      <div>
        <Button onClick={handleClick}>ClickMe</Button>
      </div>
      {dropdown}
    </div>
  );
}
