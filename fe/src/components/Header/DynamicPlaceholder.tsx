import React, { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";

const DynamicPlaceholder: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const originPlaceHolder = "Search product...";
  const [placeHolder, setPlaceHolder] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const checkInput = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(""); 

  const navigate = useNavigate();

  useEffect(() => {
    const updatePlaceholder = () => {
      if (isAdding) {
        if (index < originPlaceHolder.length) {
          setPlaceHolder(originPlaceHolder.slice(0, index + 1));
          setIndex(index + 1);
        } else {
          setTimeout(() => setIsAdding(false), 1000);
        }
      } else {
        if (index > 0) {
          setPlaceHolder(originPlaceHolder.slice(0, index - 1));
          setIndex(index - 1);
        } else {
          setTimeout(() => setIsAdding(true), 1000);
        }
      }
    };

    const intervalId = setInterval(updatePlaceholder, 100);

    return () => clearInterval(intervalId);
  }, [index, isAdding, originPlaceHolder]);

  const handleSearch = () => {
    setInputValue(""); 
    navigate(routes.product + "?name=" + inputRef.current?.value);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {  
    if (event.key === 'Enter') {  
      handleSearch();  
    }  
  };

  return (
    <>
      <input ref={checkInput} hidden type="radio" id="search-check" />
      <div className="flex-1 flex items-center bg-transparent transition-all duration-500 ease-in-out border-gray-200 border rounded-full p-3">
        <input
          ref={inputRef}
          placeholder={placeHolder}
          onKeyPress={handleKeyPress} 
          value={inputValue}  
          onChange={(e) => setInputValue(e.target.value)} 
          className="outline-none transition-all duration-500 ease-in-out px-2 flex-1"
          type="text"
        />
        <label htmlFor="search-check" className="cursor-pointer">
          <FaSearch
            className=""
            onClick={handleSearch}
          />
        </label>
      </div>
    </>
  );
};

export default DynamicPlaceholder;
