import { NextPage } from "next";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Address, Position } from "../global/types";
import Card from "./card";
import { STATES } from "../global/states";

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

const TeaSearch: NextPage<Props> = ({ updatePosition }) => {
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

  const handleStateChange = (value: string) => {
    setAddress((preValues) => {
      return {
        ...preValues,
        state: value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const encodedAddress = encodeURI(
      `${address.streetOne}+${address.streetTwo},+${address.city},+${address.state},+${address.zip}`
    );
    const response = await fetch(`/api/geocoding?address=${encodedAddress}`);
    const data = await response.json();
    updatePosition(
      data.response.geolocation.lat,
      data.response.geolocation.lng
    );
  };

  return (
    <Card>
      <div className="flex flex-col w-fit">
        <h2 className="font-bold py-2">Search for tea near you.</h2>
        <div className="mb-4 grid grid-flow-col gap-4">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Street Address 1
              </label>
              <input
                type="text"
                name="streetOne"
                value={address.streetOne}
                placeholder="1234 Main St"
                onChange={handleAddressInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Street Address 2
              </label>
              <input
                type="text"
                name="streetTwo"
                value={address.streetTwo}
                placeholder="Apt 2B"
                onChange={handleAddressInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressInputChange}
                  placeholder="Albuquerque"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={address.state}
                  onChange={(event) => handleStateChange(event.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {STATES.map((o) => (
                    <option key={o.id} value={o.name}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  value={`${address.zip}`}
                  onChange={handleAddressInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-end -mx-3 my-3 gap-2">
              <button
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded md:w-1/4 px-3 mx-4 md:mb-0"
                type="submit"
                value="Search"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default TeaSearch;
