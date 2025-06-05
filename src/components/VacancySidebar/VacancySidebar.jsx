import s from "./VacancySidebar.module.css";
import Image from "next/image";
import { VacationController } from "../VacationController/VacationController";
import Link from "next/link";

const VacancySidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`${s.sidebar} ${isOpen ? s.isOpen : ""}`}>
      <header>
        <h2>Фільтри</h2>
        <button onClick={() => onClose()}>
          <Image
            width={1920}
            height={1080}
            src="/icons/icon-close.svg"
            alt="Logotype"
          />
        </button>
      </header>
      <div >
        <VacationController></VacationController>
      </div>
    </aside>
  );
};

export default VacancySidebar;
