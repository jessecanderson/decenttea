import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Address from "../global/types";

var startingAddress: Address = {
    streetOne: '',
    streetTwo: '',
    city: '',
    state: '',
    zip: 0
}

const TeaSearch: NextPage<{}> = (props) => {
    const [address, setAddress] = useState(startingAddress);


    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist;
        console.log(event.target);

        switch (event.target.name) {
            case "streetOne":
                setAddress((values) => ({
                    ...values,
                    streetOne: event?.target.value,
                }));
            case "streetTwo":
                setAddress((values) => ({
                    ...values,
                    streetTwo: event?.target.value,
                }));
            case "city":
                setAddress((values) => ({
                    ...values,
                    city: event?.target.value,
                }));
            case "state":
                setAddress((values) => ({
                    ...values,
                    state: event?.target.value,
                }));
            case "zip":
                setAddress((values) => ({
                    ...values,
                    zip: +event?.target.value,
                }));
        }
    }

    useEffect(() => {

    }, [address]);

    return (
        <div className="shadow p-2">
            <h2 className="font-bold py-2">Search for tea near you.</h2>
            <form className="grid grid-cols-2 gap-2">
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">Street Address Line 1</span>
                    <input type="text" name="streetOne" value={address.streetOne} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">Street Address Line 2</span>
                    <input type="text" name="streetTwo" value={address.streetTwo} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">City</span>
                    <input type="text" name="city" value={address.city} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">State</span>
                    <input type="text" name="state" value={address.state} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">Zip</span>
                    <input type="text" name="zip" value={`${address.zip}`} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <div className="flex justify-center">
                    <input type="submit" value="Search" />
                </div>
            </form>
        </div>
    );
}

export default TeaSearch;