import { useEffect, useState } from "react";

export default function useSearchBoxClick(ref) {
  const [showHideSearchInput, setShowHideSearchInput] = useState("hidden");

  const [inputDivCls, setinputDivCls] = useState("");

  useEffect(() => {
    function handleClickOutsideDiv(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowHideSearchInput("hidden");
        setinputDivCls("");
      } else {
        setShowHideSearchInput("wauto");
        setinputDivCls("searchfieldfocused");
      }
    }

    document.addEventListener("mousedown", handleClickOutsideDiv);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDiv);
    };
  }, [ref]);

  return { showHideSearchInput, inputDivCls };
}
