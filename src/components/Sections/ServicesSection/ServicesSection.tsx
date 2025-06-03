"use client";

import { Container } from "@/components/Container";
import s from "./ServicesSection.module.css";
import { Accordion } from "@/components/Accordion/Accordion";
import { useState } from "react";
import Image from "next/image";
import { useModal } from "@/components/ModalContext";
import { useRouter } from "next/navigation";

export const nannyCards = [
  {
    id: "permanent",
    title: "ПОСТІЙНА НЯНЯ",
    description:
      "Послуга для родин, яким потрібна стабільна допомога. Ми ретельно підбираємо няню, враховуючи ваші побажання, потреби та сімейні цінності для довготривалої співпраці.",
    tags: ["Довготривало", "Плавна адаптація"],
    price: "від <span>12,000 грн</span> / за підбір",
    shortDesc: "100% місячної оплати няні",
    buttonText: "Підібрати няню",
    theme: "white",
  },
  {
    id: "hourly",
    title: "ПОГОДИННА НЯНЯ",
    description:
      "Послуга для родин, яким потрібна ситуативна допомога на кілька годин або на короткий період (кілька днів чи тижнів). Підберемо кваліфіковану няню буквально за 1-2 дні, а в деяких випадках — навіть у той самий день.",
    tags: ["Кілька годин/днів", "Гнучкий графік"],
    price: "від <span>300 грн</span> / год",
    buttonText: "Підібрати няню",
    theme: "white",
  },
  {
    id: "training",
    title: "НАВЧАННЯ ДЛЯ НЯНЬ",
    description:
      "Онлайн-курс для нянь, які хочуть працювати впевнено та з розумінням потреб дітей. Програма охоплює нейропедагогіку, основи педіатрії, дитячу психологію та кар’єрний розвиток. Після завершення — сертифікат, який визнають наш сервіс і родини.",
    tags: ["Швидкий старт", "Гнучкий графік"],
    price: "",
    buttonText: "Дізнатися детальніше",
    theme: "yellow",
  },
];
export const accordionData = [
  {
    id: 1,
    title: "няня-педагог",
    description:
      "Послуга для родин, яким потрібна стабільна допомога. Ми ретельно підбираємо няню, враховуючи ваші побажання, потреби та сімейні цінності для довготривалої співпраці.",
    tags: ["Довготривало", "Плавна адаптація"],
    price: "від <span>12,000 грн</span> / за підбір",
    shortDesc: "100% місячної оплати няні",
    buttonText: "Підібрати няню",
    theme: "white",
  },
  {
    id: 2,
    title: "нічна няня",
    description:
      "Послуга для родин, яким потрібна ситуативна допомога на кілька годин або на короткий період (кілька днів чи тижнів). Підберемо кваліфіковану няню буквально за 1-2 дні, а в деяких випадках — навіть у той самий день.",
    tags: ["Кілька годин/днів", "Гнучкий графік"],
    price: "від <span>300 грн</span> / год",
    buttonText: "Підібрати няню",
    theme: "white",
  },
  {
    id: 3,
    title: "няня на захід",
    description:
      "Онлайн-курс для нянь, які хочуть працювати впевнено та з розумінням потреб дітей. Програма охоплює нейропедагогіку, основи педіатрії, дитячу психологію та кар’єрний розвиток. Після завершення — сертифікат, який визнають наш сервіс і родини.",
    tags: ["Швидкий старт", "Гнучкий графік"],
    price: "від <span>20,000 грн</span> / місяць",

    buttonText: "Дізнатися детальніше",
    theme: "yellow",
  },
  {
    id: 4,
    title: "няня вихідного дня",
    description:
      "Онлайн-курс для нянь, які хочуть працювати впевнено та з розумінням потреб дітей. Програма охоплює нейропедагогіку, основи педіатрії, дитячу психологію та кар’єрний розвиток. Після завершення — сертифікат, який визнають наш сервіс і родини.",
    tags: ["Швидкий старт", "Гнучкий графік"],
    price: "від <span>20,000 грн</span> / місяць",

    buttonText: "Дізнатися детальніше",
    theme: "yellow",
  },
];

export const ServicesSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const { openModal } = useModal();

  const router = useRouter();

  const handleRedirect = () => {
    router.push("/education");
  };

  return (
    <section className={s.section}>
      <Container>
        <h3 className={s.title}>
          Наші основні <span>послуги {line}</span>
        </h3>

        <ul className={s.servicesList}>
          {nannyCards.map((card, index) => (
            <li
              className={card.theme === "yellow" ? s.yellow : ""}
              key={card.id}
            >
              <div>
                <div className={s.tagList}>
                  {card.tags.map((tag, index) => (
                    <div className={s.tag} key={index}>
                      <p>{tag}</p>
                      <span>{index === 1 ? border1 : border2}</span>
                    </div>
                  ))}
                </div>

                <h3 className={s.cardTitle}>{card.title}</h3>

                <p className={s.cardDesc}>{card.description}</p>
              </div>

              <div>
                {card.price && (
                  <div className={s.priceInfo}>
                    {priceIcon}

                    <div>
                      <p
                        dangerouslySetInnerHTML={{ __html: card.price }}
                        className={s.cardPrice}
                      ></p>

                      {card.shortDesc && (
                        <span className={s.shortDesc}>{card.shortDesc}</span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    index === 2 ? handleRedirect() : openModal("formA")
                  }
                >
                  {card.buttonText}
                </button>
              </div>

              {index === 1 ? (
                <div className={s.plasters}>
                  <div className={s.plaster}>
                    <Image
                      width={1920}
                      height={1080}
                      src="/images/plaster.png"
                      alt="Plaster"
                    />
                  </div>

                  <div className={s.plaster}>
                    <Image
                      width={1920}
                      height={1080}
                      src="/images/plaster.png"
                      alt="Plaster"
                    />
                  </div>
                </div>
              ) : (
                <div className={s.plaster}>
                  <Image
                    width={1920}
                    height={1080}
                    src="/images/plaster.png"
                    alt="Plaster"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

        <h3 className={s.title}>
          Додаткові <span>послуги {line}</span>
        </h3>

        <ul className={s.accordionList}>
          {accordionData.map((accordion) => (
            <li key={accordion.id}>
              <Accordion
                id={accordion.id}
                isOpen={openId === accordion.id}
                onToggle={toggle}
                title={accordion.title}
              >
                <div>
                  <div>
                    <div className={s.tagList}>
                      {accordion.tags.map((tag, index) => (
                        <div className={s.tag} key={index}>
                          <p>{tag}</p>
                          <span>{index === 1 ? border1 : border2}</span>
                        </div>
                      ))}
                    </div>

                    <p className={s.cardDesc}>{accordion.description}</p>
                  </div>

                  <div>
                    {accordion.price && (
                      <div className={s.priceInfo}>
                        {priceIcon}
                        <div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: accordion.price,
                            }}
                            className={s.cardPrice}
                          ></p>
                          {accordion.shortDesc && (
                            <span className={s.shortDesc}>
                              {accordion.shortDesc}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <button className={s.btn}>{accordion.buttonText}</button>
                  </div>
                </div>
              </Accordion>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

const line = (
  <svg viewBox="0 0 172 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 16C2.39229 12.7275 9.17241 10.5471 11.6047 9.70162C17.0037 7.82501 21.1133 4.84878 26.9525 4.84878C30.4999 4.84878 45.4816 1.53741 37.8444 7.94864C35.8765 9.60068 35.8745 8.67763 34.8582 10.5323C33.4661 13.0726 35.9914 11.2041 37.5812 10.9969C45.4273 9.97419 52.1821 10.3024 60.1235 9.60068C72.9775 8.46477 87.3549 10.7211 100.033 8.2564C109.531 6.40974 119.477 6.55482 128.93 4.84869C135.194 3.71824 141.511 2.26739 147.892 2.26739C150 2.26739 155.15 0.96031 154.972 4.12593C154.874 5.85198 149.693 8.12105 148.288 8.77227C146.739 9.49027 138.62 12.4893 141.604 12.4893C155.008 12.4893 156.872 12.2548 170 9.60068"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const border1 = (
  <svg viewBox="0 0 189 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M170.575 13.0166C138.995 1.63498 100.667 0.736412 30.7268 2.99461C-12.5771 4.39279 -4.48553 50.0524 38.6814 53.5437C59.6501 55.2397 86.9345 55.1785 123.241 54.7302C208.922 53.6723 189.813 19.9501 170.575 13.0166Z"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const border2 = (
  <svg viewBox="0 0 183 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.8927 43.1913C48.4483 54.3581 85.5331 55.2397 153.205 53.0242C195.104 51.6524 187.275 6.85428 145.508 3.42881C125.22 1.76486 98.8201 1.82485 63.6908 2.26468C-19.2115 3.30263 -0.721477 36.3886 17.8927 43.1913Z"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const priceIcon = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_653_1091)">
      <path
        d="M23.0451 12.467C23.1438 14.029 24.5175 15.4874 26.271 15.4874C28.9952 15.4874 30.4153 12.1593 28.6828 10.0298C26.8121 7.73053 22.8639 9.59641 23.0451 12.467ZM25.9712 14.5415C24.9336 14.4094 24.0356 13.4527 23.9699 12.409C23.8468 10.466 26.6457 8.99589 27.9643 10.615C29.2696 12.2187 28.1022 14.8172 25.9712 14.5415Z"
        fill="black"
      />
      <path
        d="M15.5733 18.0585C15.4261 17.8492 15.1371 17.7985 14.9281 17.9451C14.7185 18.0917 14.6675 18.3807 14.8144 18.5906C17.8992 22.9943 21.6628 22.2464 22.5951 24.4409C22.6702 24.617 22.8415 24.7226 23.0219 24.7226C23.3527 24.7226 23.5778 24.3841 23.4481 24.0777C22.2634 21.2932 18.577 22.3487 15.5733 18.0585Z"
        fill="black"
      />
      <path
        d="M15.9507 27.5579C13.7211 26.7592 11.9174 24.9543 10.326 23.3623C10.145 23.1813 9.85186 23.1813 9.67089 23.3623C9.48991 23.5433 9.48991 23.8364 9.67089 24.0174C11.331 25.6788 13.2129 27.5615 15.6382 28.4302C17.0563 28.9382 19.1613 29.1802 19.7135 30.6839C19.7825 30.8715 19.9596 30.9874 20.1484 30.9874C20.4705 30.9874 20.6942 30.6664 20.5833 30.3642C19.8446 28.355 17.3151 28.0474 15.9507 27.5579Z"
        fill="black"
      />
      <path
        d="M11.6004 4.11511C11.4414 4.31539 11.4749 4.60676 11.6752 4.76602C14.2581 6.77021 14.1605 6.84059 14.4498 6.84059C14.8878 6.84059 15.0811 6.2864 14.7382 6.01474L12.2513 4.03971C12.0513 3.88045 11.7596 3.91483 11.6004 4.11511Z"
        fill="black"
      />
      <path
        d="M16.1261 5.59352C16.3716 5.52113 16.5122 5.26354 16.4401 5.01802L15.5292 1.92034C15.4568 1.67542 15.1983 1.53486 14.954 1.60665C14.7085 1.67904 14.5679 1.93663 14.64 2.18215L15.5509 5.27983C15.6233 5.52546 15.8809 5.66504 16.1261 5.59352Z"
        fill="black"
      />
      <path
        d="M18.9412 0.312668L17.5802 4.24343C17.4967 4.48534 17.6249 4.74896 17.8668 4.83281C18.1007 4.91454 18.3703 4.79429 18.4561 4.54626L19.8165 0.615499C19.9003 0.373596 19.7721 0.109977 19.5305 0.0261255C19.2874 -0.0589325 19.0244 0.0707658 18.9412 0.312668Z"
        fill="black"
      />
      <path
        d="M35.776 14.3649C35.3859 12.4082 34.3194 7.97226 33.254 6.28229C32.8988 5.0042 31.65 4.3247 30.445 4.58083C26.5393 5.41404 22.8811 5.68273 18.412 6.4328C17.863 6.52449 17.1639 6.94255 16.8203 7.38352C12.379 13.0933 8.39922 18.786 4.06282 24.4615C3.54568 25.1374 3.32226 25.9657 3.4029 26.8078C2.98317 28.5353 4.50809 29.9077 5.86299 31.0248C9.3521 33.9016 12.8645 36.7944 16.8055 39.012C19.9147 40.7613 21.2641 40.1324 23.1669 37.6084C26.9487 32.5924 30.7347 27.5703 34.1185 22.2777C36.1724 19.0653 36.4442 17.7164 35.776 14.3649ZM34.0038 18.6269C30.2878 24.5646 25.8009 30.7322 21.1447 37.0561C20.3695 38.1082 18.9091 38.3639 17.8208 37.6388C13.2248 34.5751 9.4111 31.4584 5.30611 28.4634C4.20452 27.6592 3.96906 26.1099 4.79878 25.0237C6.7714 22.4424 8.69124 19.8291 10.548 17.3021C12.7957 14.2425 15.1201 11.0784 17.5514 7.95299C17.7559 7.68997 18.2392 7.40101 18.5652 7.34612C23.0451 6.59529 26.6912 6.32961 30.6383 5.48691C30.7436 5.46459 30.8491 5.45373 30.9538 5.45373C31.64 5.45373 32.2699 5.93696 32.4022 6.65661L32.7135 8.34268C33.4199 12.1612 33.9302 14.9205 34.2403 17.5838C34.2744 17.877 34.1619 18.3741 34.0038 18.6269Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_653_1091">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
