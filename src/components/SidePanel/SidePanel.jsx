import s from "./SidePanel.module.css";
import Image from "next/image";
import SidePanelLangSwitcher from "../SidePanelLangSwitcher/SidePanelLangSwitcher";
import Link from "next/link";

const navLinks = [
  { title: "Підбір няні", link: "" },
  { title: "Навчання", link: "education" },
  { title: "Стати нянею", link: "nanny-selection" },
  { title: "Вакансії", link: "vacation" },
  { title: "Блог", link: "blog" },
];

const SidePanel = ({ isOpen, onClose }) => {
  return (
    <aside className={`${s.sidePanel} ${isOpen ? s.isOpen : " "}`}>
      <div className={s.sidePanelCont}>
        <header>
          <button onClick={() => onClose()}>
            <Image
              width={1920}
              height={1080}
              src="/icons/icon-close.svg"
              alt="Logotype"
            />
          </button>
          <Image
            className={s.headerLogo}
            width={1920}
            height={1080}
            src="/icons/header-logo.svg"
            alt="Logotype"
          />
        </header>
        <SidePanelLangSwitcher />

        <nav className={s.nav}>
          <h2>Меню</h2>
          <ul className={s.sidePanelNavList}>
            {navLinks.map((item, index) => {
              return (
                <li key={index} onClick={() => onClose()}>
                  <Link href={`/${item.link}`}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={s.contacts}>
          <div>
            <p className={s.contactSubtitle}>Написати нам</p>
            <a href="">service.smartnanny@gmail.com</a>
          </div>
          <div>
            <p className={s.contactSubtitle}>Зателефонувати нам</p>
            <a href="">+38 (098) 308 58 47</a>
          </div>

          <ul className={s.socialLinks}>
            <li>
              <Link href="">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-inst.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-viber.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-tg.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-whatsapp.svg"
                  alt="Logotype"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
