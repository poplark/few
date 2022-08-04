import React, { useState } from 'react';
import { Button } from '@/Button';
import { Menu, MenuItem } from '@/Menu';
import { Dropdown, DropdownTrigger, DropdownContent } from '@/Dropdown';

export default function App() {
  const [v, setV] = useState(0);
  const handleClick = () => {
    setV(v+1);
  }
  return (
    <div>
      <div>Hello world. v: {v} </div>
      <div><Button onClick={handleClick}>ClickMe</Button></div>
      <Dropdown>
        <DropdownTrigger>
          <Button color="default">hi dropdown</Button>
        </DropdownTrigger>
        <DropdownContent>
          <Menu>
            <MenuItem key="1">一</MenuItem>
            <MenuItem key="2">二</MenuItem>
            <MenuItem key="3">三</MenuItem>
            <MenuItem key="4" onClick={() => setV(4)}>将 v 置为 4</MenuItem>
          </Menu>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
