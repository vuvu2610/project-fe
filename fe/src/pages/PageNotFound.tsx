import React from "react";
import { Link } from "react-router-dom";
import routes from "../config/routes";

interface Props {}

function PageNotFound(props: Props) {
  const {} = props;

  return (
    <div className="flex items-center flex-col justify-center py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28 mx-auto">
      <div className="w-full">
        <img
          className="hidden lg:block"
          src="https://i.ibb.co/v30JLYr/Group-192-2.png"
          alt=""
        />
        <img
          className="hidden md:block lg:hidden"
          src="https://i.ibb.co/c1ggfn2/Group-193.png"
          alt=""
        />
        <img
          className="md:hidden"
          src="https://i.ibb.co/8gTVH2Y/Group-198.png"
          alt=""
        />
      </div>
      <div className="w-full">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-4 text-base text-gray-800">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-2 text-base text-gray-800">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Link to={routes.home} className="inline-block w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-primary  text-white hover:opacity-80  focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
