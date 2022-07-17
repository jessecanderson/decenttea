import * as React from 'react';
import Address from '../global/types';

type Action = | { type: 'SET_ADDRESS'; payload: Address } | { type: 'DEL_ADDRESS'; payload: Address };
type State = { 
    data: Address;
    isLoading: boolean;
    error?: string;
}

const deafultAddress: Address = {
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    zip: 0
}


const AddressContext = React.createContext<Address>(deafultAddress);

function addressReducer(state: Address, action: Action): State {
    switch (action.type) {
        case 'SET_ADDRESS':
            return {data: action.payload, isLoading: false};
        default:
            return {data: state, isLoading: false};
    }
}

function AddressProvider({ children }: { children: React.ReactNode }) {
    const [{data, isLoading, error}, dispatch] = React.useReducer(addressReducer, {isLoading: true});

    return (
        <AddressContext.Provider value={data}>
            {children}
        </AddressContext.Provider>
    );
}

export {AddressProvider};

