import * as React from "react";
export function useClick() {
  const ref = React.useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    ref.current?.click();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
export function useShow() {
  const [show, setShow] = React.useState(false);

  const toggle = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);
  React.useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);
  return { show, toggle };
}
