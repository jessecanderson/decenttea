import { NextPage } from "next";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Address, Position } from "../global/types";

var startingAddress: Address = {
  streetOne: "",
  streetTwo: "",
  city: "",
  state: "",
  zip: 0,
};

interface Props {
  updatePosition: (lat: number, long: number) => void;
}

const TeaSearch: NextPage<Props> = (props) => {
  const [address, setAddress] = useState(startingAddress);

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target);
    console.log(event.target.value);

    switch (event.target.name) {
      case "streetOne":
        setAddress((preValues) => {
          return {
            ...preValues,
            streetOne: event?.target.value,
          };
        });
        break;
      case "streetTwo":
        setAddress((preValues) => {
          return {
            ...preValues,
            streetTwo: event?.target.value,
          };
        });
        break;
      case "city":
        setAddress((preValues) => {
          return {
            ...preValues,
            city: event?.target.value,
          };
        });
        break;
      case "state":
        setAddress((preValues) => {
          return {
            ...preValues,
            state: event?.target.value,
          };
        });
        break;
      case "zip":
        setAddress((preValues) => {
          return {
            ...preValues,
            zip: +event?.target.value,
          };
        });
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const encodedAddress = encodeURI(
      `${address.streetOne}+${address.streetTwo},+${address.city},+${address.state},+${address.zip}`
    );
    fetch(`/api/geocoding?address=${encodedAddress}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.updatePosition(
          data.response.geolocation.lat,
          data.response.geolocation.lng
        );
      });
  };

  return (
    <div className="shadow p-2">
      <h2 className="font-bold py-2">Search for tea near you.</h2>
      <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
        <label className="block p-1 text-sm font-medium text-slate-700">
          <span className="px-2">Street Address Line 1</span>
          <input
            type="text"
            name="streetOne"
            value={address.streetOne}
            onChange={handleAddressInputChange}
            className="px-2 border-2 rounded"
          />
        </label>
        <label className="block p-1 text-sm font-medium text-slate-700">
          <span className="px-2">Street Address Line 2</span>
          <input
            type="text"
            name="streetTwo"
            value={address.streetTwo}
            onChange={handleAddressInputChange}
            className="px-2 border-2 rounded"
          />
        </label>
        <label className="block p-1 text-sm font-medium text-slate-700">
          <span className="px-2">City</span>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleAddressInputChange}
            className="px-2 border-2 rounded"
          />
        </label>
        <label className="block p-1 text-sm font-medium text-slate-700">
          <span className="px-2">State</span>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleAddressInputChange}
            className="px-2 border-2 rounded"
          />
        </label>
        <label className="block p-1 text-sm font-medium text-slate-700">
          <span className="px-2">Zip</span>
          <input
            type="text"
            name="zip"
            value={`${address.zip}`}
            onChange={handleAddressInputChange}
            className="px-2 border-2 rounded"
          />
        </label>
        <div className="flex justify-center">
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>
  );
};

export default TeaSearch;
