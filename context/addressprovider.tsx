import * as React from 'react';
import Address from '../global/types';

const deafultAddress: Address = {
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    zip: 0
}

type Action = | { type: 'SET_ADDRESS'; payload: Address } | { type: 'DEL_ADDRESS'; payload: Address };
type State = { 
    data: Address;
    isLoading: boolean;
    error?: string;
}

type AddressProviderProps = {children: React.ReactNode};

const AddressContext = React.createContext<Address>(deafultAddress);

function addressReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ADDRESS':
            return {data: action.payload, isLoading: false};
        default:
            return {data: state.data, isLoading: false};
    }
}

function AddressProvider({ children }: AddressProviderProps) {
    const [{data, isLoading, error}, dispatch] = React.useReducer(addressReducer, {data: deafultAddress,isLoading: true});

    return (
        <AddressContext.Provider value={data}>
            {children}
        </AddressContext.Provider>
    );
}

function useAddress() {
    const context = React.useContext(AddressContext);
    if (context === undefined) {
        throw new Error('useAddress must be used within a AddressProvider');
    }
    return context;
}

export {AddressProvider, useAddress};

