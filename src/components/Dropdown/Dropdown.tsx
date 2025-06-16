"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";


interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  value?: string | null;
}

export const Dropdown = ({
  options,
  placeholder = "Оберіть",
  onSelect,
  value = null,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || placeholder}
        <span className={`${styles.arrow} ${isOpen ? styles.up : ""}`}>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              d="M1 5.11328L8 12.1133L15 5.11328"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
