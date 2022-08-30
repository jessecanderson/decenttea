import { type } from 'os';

type Address = {
    streetOne: string;
    streetTwo: string;
    city: string;
    state: string;
    zip: number;
}

type Action = | { type: 'SET_ADDRESS'; payload: Address } | { type: 'DEL_ADDRESS'; payload: Address };

type State = { 
    data: Address;
    isLoading: boolean;
    error?: string;
}

export type {Address, Action, State};