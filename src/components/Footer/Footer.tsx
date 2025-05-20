import { Container } from "../Container";
import Image from "next/image";
import s from "./Footer.module.css";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.clouds}>
          <Image
            width={1920}
            height={1080}
            src="/images/cloud1.png"
            alt="Cloud"
            className={s.cloud1}
          />
          <Image
            width={1920}
            height={1080}
            src="/images/cloud2.png"
            alt="Cloud"
            className={s.cloud2}
          />
          <Image
            width={1920}
            height={1080}
            src="/images/cloud3.png"
            alt="Cloud"
            className={s.cloud3}
          />
          <Image
            width={1920}
            height={1080}
            src="/images/cloud4.png"
            alt="Cloud"
            className={s.cloud4}
          />
        </div>

        <div className={s.logo}>
          <Image
            width={1920}
            height={1080}
            src="/icons/footer-logo.svg"
            alt="Logotype"
          />
        </div>

        <h2 className={s.title}>
          Ваш простір турботи <span>та підтримки {line}</span>
        </h2>

        <nav className={s.footerNav}>
          <ul>
            <li>
              <Link href="/">Стати нянею</Link>
            </li>
            <li>
              <Link href="/">Вакансії</Link>
            </li>
            <li>
              <Link href="/">Блог</Link>
            </li>
            <li>
              <Link href="/">Навчання</Link>
            </li>
          </ul>
        </nav>

        <ul className={s.socialLinks}>
          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-inst"></use>
              </svg>
              Instagram
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-viber"></use>
              </svg>
              Viber
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-tg"></use>
              </svg>
              Telegram
            </a>
          </li>

          <li>
            <a href="">
              <svg>
                <use xlinkHref="/icons/social-icons.svg#icon-whatsapp"></use>
              </svg>
              WhatsApp
            </a>
          </li>
        </ul>

        <div className={s.footerBottomContainer}>
          <div className="flex gap-[1.6vw]">
            <Link href="">Політика конфіденційності</Link>
            <Link href="">Договір публічної оферти</Link>
          </div>

          <div className="absolute left-[50%] -translate-x-[50%]">
            ©2025 Smart Nanny. All Rights Reserved.
          </div>

          <div>
            Сайт розроблено агенством:{" "}
            <a className={s.dev} href="">
              Before/After
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const line = (
  <svg viewBox="0 0 296 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.50004 20.5938C1.86474 17.3734 8.16807 15.2279 10.4293 14.3959C15.4487 12.5493 19.2693 9.62054 24.6978 9.62054C27.9958 9.62054 41.9239 6.36203 34.8238 12.6709C32.9943 14.2966 32.9925 13.3883 32.0476 15.2133C30.7534 17.7131 33.1011 15.8744 34.5791 15.6705C41.8734 14.6641 48.1533 14.9872 55.5361 14.2966C67.4862 13.1788 80.8527 15.3991 92.6388 12.9738C101.47 11.1566 110.715 11.2993 119.504 9.62045C125.327 8.50805 131.2 7.08036 137.133 7.08036C139.092 7.08036 143.88 5.79414 143.714 8.90923C143.624 10.6077 138.807 12.8406 137.501 13.4814C136.06 14.1879 128.513 17.1391 131.287 17.1391C143.748 17.1391 155.351 14.2643 167.557 11.6525C178.018 9.41397 188.596 5.25149 199.223 5.25149C211.681 5.25149 223.559 3.42262 236.091 3.42262C240.86 3.42262 244.791 1.52017 244.791 7.53757C244.791 9.53221 244.59 11.6892 243.778 13.4814C243.385 14.3489 239.98 18.2397 240.648 16.5803C242.714 11.4508 251.378 11.2649 255.561 9.62045C261.876 7.13776 269.164 5.51122 275.813 4.33705C281.982 3.2477 288.216 1.59375 294.5 1.59375"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
