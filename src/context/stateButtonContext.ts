import { createContext, Dispatch, SetStateAction } from 'react';

type StateButtonContextType = [string, Dispatch<SetStateAction<string>> | null];

const initialState: string = '';
const StateButtonContext = createContext<StateButtonContextType>([initialState, null]);

export { initialState };
export default StateButtonContext;
