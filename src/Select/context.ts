import { createContext } from 'react';
import { SizeType } from '../config/size-type';

interface ISelectContext {
  size: SizeType
}

export const SelectContext = createContext<ISelectContext>({size: 'normal'});
