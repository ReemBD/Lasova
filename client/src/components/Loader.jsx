import { useState, useEffect } from "react";
import { ReactComponent as LoaderSVG } from "../assets/imgs/loader.svg";

export const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader">
      {isLoading ? <LoaderSVG /> : <h1 className="flex-center">no results</h1>}
    </div>
  );
};
