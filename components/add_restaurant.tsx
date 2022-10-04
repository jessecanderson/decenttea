import { NextPage } from "next";

import React, { useEffect, useState } from "react";
import Card from "./card";

interface Props {
  callback: () => void;
}

const AddRestaurant: NextPage<Props> = (props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting");
  };

  return (
    <Card>
      <div className="flex flex-col w-fit">
        <h2 className="font-bold py-2">Add a Restaurant</h2>
        <p>Not able to find your favorite tea place? Add it here!</p>

        <div className="mb-4 grid grid-flow-col gap-2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label>Name</label>
              <input type="text" className="px-2 border-2 rounded w-fit" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label>Name</label>
                <input type="text" className="px-2 border-2 rounded w-fit" />
              </div>
              <div className="flex flex-col">
                <label>Name</label>
                <input type="text" className="px-2 border-2 rounded w-fit" />
              </div>
              <input
                className="cursor-pointer w-fit border-2 rounded-md p-2 hover:text-white hover:bg-teal-500"
                type="button"
                value="Cancel"
                onClick={props.callback}
              />
              <input
                className="cursor-pointer w-fit border-2 rounded-md p-2 hover:text-white hover:bg-teal-500"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default AddRestaurant;
