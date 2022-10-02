import { NextPage } from "next";

import React, { useEffect, useState } from "react";

interface Props {
  callback: () => void;
}

const AddRestaurant: NextPage<Props> = (props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting");
  };

  return (
    <div className="container">
      <div className="w-full rounded-xl shadow p-4">
        <h2 className="font-bold py-2">Add a Restaurant</h2>
        <p>Not able to find your favorite tea place? Add it here!</p>

        <div className="mb-4 grid grid-flow-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="cursor-pointer"
                type="button"
                value="Cancel"
                onClick={props.callback}
              />
              <input className="cursor-pointer" type="submit" value="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
