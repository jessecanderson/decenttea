import { NextPage } from "next";
import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Address, Position } from "../global/types";
import Card from "./card";

var startingAddress: Address = {
  streetOne: "",
  streetTwo: "",
  city: "",
  state: "",
  zip: "",
};

interface Props {
  updatePosition: (lat: number, long: number) => void;
}

const TeaSearch: NextPage<Props> = (props) => {
  const [address, setAddress] = useState(startingAddress);

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
            zip: event?.target.value,
          };
        });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const encodedAddress = encodeURI(
      `${address.streetOne}+${address.streetTwo},+${address.city},+${address.state},+${address.zip}`
    );
    const response = await fetch(`/api/geocoding?address=${encodedAddress}`);
    const data = await response.json();
    props.updatePosition(data.lat, data.long);
  };

  return (
    <Card>
      <h2 className="font-bold py-2">Search for tea near you.</h2>
      <div className="mb-4 grid grid-flow-col gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Street Address 1</label>
            <input
              type="text"
              name="streetOne"
              value={address.streetOne}
              onChange={handleAddressInputChange}
              className="w-full max-w-lg px-2 border-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Street Address 2</label>
            <input
              type="text"
              name="streetTwo"
              value={address.streetTwo}
              onChange={handleAddressInputChange}
              className="w-full max-w-lg px-2 border-2 rounded"
            />
          </div>
          <div className="grid grid-cols-4 items-end content-center gap-2">
            <div className="flex flex-col">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressInputChange}
                className="px-2 border-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressInputChange}
                className="px-2 border-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label>Zip</label>
              <input
                type="text"
                name="zip"
                value={`${address.zip}`}
                onChange={handleAddressInputChange}
                className="px-2 border-2 rounded"
              />
            </div>
            <div className="w-full border-2 rounded-md p-2 text-center cursor-pointer hover:text-white hover:bg-teal-500">
              <input className="cursor-pointer" type="submit" value="Search" />
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default TeaSearch;
