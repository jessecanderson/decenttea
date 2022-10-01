import { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AddRestaurant: NextPage = () => {
  const onClickHandler = () => {
    console.log("clicked");
  };
  return (
    <div className="text-end p-8">
      <FontAwesomeIcon
        className="cursor-pointer"
        onClick={onClickHandler}
        icon={faPlusCircle}
      />
    </div>
  );
};

export default AddRestaurant;
