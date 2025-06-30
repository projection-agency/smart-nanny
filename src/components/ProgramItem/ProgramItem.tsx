"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import s from "./ProgramItem.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { closeIco } from "../ModalContext";

export type ProgramItemProps = {
  module: number;
  title: string;
  duration: string;
  lessons: string;
  lectures: string[];
  result: string;
  previewImage?: string;
  videoUrl?: string;
};

export const ProgramItem = ({
  module,
  title,
  duration,
  lessons,
  lectures,
  result,
  previewImage,
  videoUrl,
}: ProgramItemProps) => {
  console.log(duration);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  const { t } = useTranslation("common");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <motion.li
      className={`${s.item} ${isOpen && s.active} `}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={s.header}>
        <div className={s.meta}>
          <span className={s.module}>
            {t("program_module")} {module}
          </span>
          <h3>{title}</h3>
          <div className={s.info}>
            <span>
              <Image
                width={1920}
                height={1080}
                src="/icons/time-icon.svg"
                alt="time"
              />{" "}
              {`${duration} ${t("program_duration")}`}
            </span>
            <span>
              <Image
                width={1920}
                height={1080}
                src="/icons/lessons-icon.svg"
                alt="lesson"
              />
              {lessons}
            </span>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className={s.toggleBtn}>
          <span className={s.toggleText}>
            {isOpen ? t("program_collapse") : t("program_expand")}{" "}
          </span>
          <span className={`${isOpen ? s.opened : ""} ${s.icon}`}>{arrow}</span>
        </button>
      </div>

      <div
        className={s.contentWrapper}
        style={{ maxHeight: height }}
        ref={contentRef}
      >
        <div className={s.content}>
          <div className={s.columns}>
            <div className={s.lectionBlock}>
              <h4>{t("program_lectures")}:</h4>
              <ol>
                {lectures.map((l, i) => (
                  <li key={i}>
                    {++i}. {l}
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.resBLock}>
              <h4>{t("program_result")}:</h4>
              <p>{result}</p>
            </div>
          </div>
          {typeof videoUrl === 'string' && videoUrl.trim().length > 0 && (
            <div className={s.preview} onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }}>
              <Image
                src={previewImage || "/images/program-item-video.jpg"}
                alt="Превʼю"
                width={1920}
                height={1080}
              />
              <div className={s.playButton}>▶</div>
            </div>
          )}
        </div>
      </div>
      {isVideoOpen && typeof videoUrl === 'string' && videoUrl.trim().length > 0 && (
        <div className={s.videoPopup} onClick={() => setIsVideoOpen(false)}>
          <div className={s.videoPopupContent} onClick={e => e.stopPropagation()}>
            <video src={videoUrl} controls autoPlay style={{ width: '100%', height: 'auto' }} />
            <button onClick={() => setIsVideoOpen(false)} className={s.closeBtn}>
              {closeIco}
            </button>
          </div>
        </div>
      )}
    </motion.li>
  );
};

const arrow = (
<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1387 1.11914C13.3537 1.37891 13.3537 1.78223 13.1387 2.04199L7.52148 8.82812V8.82715C7.48156 8.87774 7.32642 9.06056 7.0625 9.08691C6.87897 9.10508 6.73261 9.03865 6.63965 8.97559C6.5544 8.91775 6.50043 8.85316 6.47949 8.82715L6.47852 8.82812L0.861328 2.04199V2.04102C0.647462 1.78129 0.645171 1.38027 0.861328 1.11914C0.975411 0.981407 1.13878 0.899551 1.31543 0.899414C1.49227 0.899414 1.65633 0.981265 1.77051 1.11914L6.90039 7.31641L6.96875 7.39941V7.49121L6.98438 7.49023L7 7.49121V7.4375L7.06934 7.35352L12.2305 1.11914C12.3446 0.981472 12.5079 0.899414 12.6846 0.899414C12.8613 0.899479 13.0245 0.981403 13.1387 1.11914Z" fill="#FFF4F1" stroke="#FFF4F1" stroke-width="0.6"/>
</svg>
);
