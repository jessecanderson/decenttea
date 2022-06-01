import { NextPage } from "next";
import React, { useState } from "react";

const TeaSearch: NextPage = () => {
    const [values, setValues] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist;
        console.log(event.target);
        switch (event.target.name) {
            case "street":
                setValues((values) => ({
                    ...values,
                    street: event?.target.value,
                }));
            case "city":
                setValues((values) => ({
                    ...values,
                    city: event.target.value,
                }));
            case "state":
                setValues((values) => ({
                    ...values,
                    state: event.target.value,
                }));
            case "zip":
                setValues((values) => ({
                    ...values,
                    zip: event.target.value,
                }));
        }
    }

    return (
        <div className="shadow p-2">
            <h2 className="font-bold py-2">Search for tea near you.</h2>
            <form>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">Street Address</span>
                    <input type="text" name="street" value={values.street} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">City</span>
                    <input type="text" name="city" value={values.city} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">State</span>
                    <input type="text" name="state" value={values.state} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <label className="block p-1 text-sm font-medium text-slate-700">
                    <span className="px-2">Zip</span>
                    <input type="text" name="zip" value={values.zip} onChange={handleAddressInputChange} className="px-2 border-2 rounded" />
                </label>
                <div className="flex justify-end">
                    <input type="submit" value="Search" />
                </div>
            </form>
        </div>
    );
}

export default TeaSearch;