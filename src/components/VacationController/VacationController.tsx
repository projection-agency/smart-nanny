import Link from "next/link";
import { Dropdown } from "../Dropdown/Dropdown";
import s from "./VacationController.module.css";

export const VacationController = () => {
  return (
    <div className={s.panel}>
      <div className={s.controller}>
        <Dropdown
          placeholder="Країна"
          options={["Україна", "Польща", "Німеччина"]}
        />
        <Dropdown placeholder="Місто" options={["Київ", "Варшава", "Берлін"]} />
        <Dropdown
          placeholder="Тип зайнятості"
          options={["Повна зайнятість", "Нe повна зайнятість"]}
        />
      </div>

      <Link href="/vacation">Переглянути всі 42 вакансії</Link>
    </div>
  );
};
