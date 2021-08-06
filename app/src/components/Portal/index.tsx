import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC<unknown> = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
   const portalRoot = document.querySelector("#my-portal") as HTMLElement;

    const current = el.current;
    portalRoot!.appendChild(current);
    return () => void portalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};
