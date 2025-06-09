import s from "./SidePanelLangSwitcher.module.css";
import Image from "next/image";
const languages = ["UA", "EN"];

const SidePanelLangSwitcher = () => {
  return (
    <ul className={s.languages}>
      {languages.map((item, index) => {
        console.log(item);
        return (
          <li className={s.active} key={index}>
            {item}
            <Image src="/icons/sidebar/lang-active.svg" alt="language" width={28} height={4} />
          </li>
        );
      })}
    </ul>
  );
};

export default SidePanelLangSwitcher;
