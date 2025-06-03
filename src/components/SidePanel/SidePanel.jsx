import s from "./SidePanel.module.css";
import Image from "next/image";
import SidePanelLangSwitcher from "../SidePanelLangSwitcher/SidePanelLangSwitcher";

const navLinks = ["Підбір няні", "Навчання", "Стати нянею", "Вакансії", "Блог"];

const SidePanel = () => {
  return (
    <aside className={s.sidePanel}>
      <div className={s.sidePanelCont}>
        <header>
          <button>
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
            src="/icons/footer-logo.svg"
            alt="Logotype"
          />
        </header>
        <SidePanelLangSwitcher />

        <nav className={s.nav}>
          <h2>Меню</h2>
          <ul className={s.sidePanelNavList}>
            {navLinks.map((item, index) => {
              return <li key={index}>{item}</li>;
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
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-inst"></use>
              </svg>
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-viber"></use>
              </svg>
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-tg"></use>
              </svg>
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-whatsapp"></use>
              </svg>
            </a>
          </li>
        </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
