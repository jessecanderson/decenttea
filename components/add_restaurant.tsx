import { NextPage } from "next";

import React, { useEffect, useState } from "react";
import Card from "./card";
import { STATES } from "../global/states";

interface AddRestaurantProps {
  toggleModal: () => void;
}

const AddRestaurant: NextPage<AddRestaurantProps> = ({ toggleModal }) => {
  const [newRestaurant, setNewRestaurant] = useState({ name: "" });

  const handleRestaurantInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (event.target.name) {
      case "name":
        setNewRestaurant((preValues) => {
          return {
            ...preValues,
            name: event?.target.value,
          };
        });
        break;
      case "streetOne":
        setNewRestaurant((preValues) => {
          return {
            ...preValues,
            streetOne: event?.target.value,
          };
        });
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting");
    const encodedRestaurant = encodeURI(`${newRestaurant.name}`);
    const response = await fetch(`/api/restaurants?name=${encodedRestaurant}`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      toggleModal();
    }
  };

  return (
    <Card>
      <div className="flex flex-col w-fit">
        <h2 className="font-bold py-2">Add a Restaurant</h2>
        <p>Not able to find your favorite tea place? Add it here!</p>

        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Restaurant Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="name"
                name="name"
                type="text"
                onChange={handleRestaurantInputChange}
                placeholder="My Favorite Tea Place"
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="address"
                name="address1"
                type="text"
                onChange={handleRestaurantInputChange}
                placeholder="123 Some St."
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="city"
                name="city"
                type="text"
                placeholder="Albuquerque"
                onChange={handleRestaurantInputChange}
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  {STATES.map((o) => (
                    <option key={o.id} value={o.name}>
                      {o.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                placeholder="90210"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-end -mx-3 my-3 gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded md:w-1/4 px-3 my-6 md:mb-0"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="bg-gray-200 rounded w-full md:w-1/4 px-3 my-6 mr-3 md:mb-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AddRestaurant;
