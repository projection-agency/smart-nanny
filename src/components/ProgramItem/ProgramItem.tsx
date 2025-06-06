"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import s from "./ProgramItem.module.css";

export type ProgramItemProps = {
  module: number;
  title: string;
  duration: string;
  lessons: string;
  lectures: string[];
  result: string;
  previewImage?: string;
};

export const ProgramItem = ({
  module,
  title,
  duration,
  lessons,
  lectures,
  result,
  previewImage,
}: ProgramItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <li className={`${s.item} ${isOpen && s.active} `}>
      <div className={s.header}>
        <div className={s.meta}>
          <span className={s.module}>Модуль {module}</span>
          <h3>{title}</h3>
          <div className={s.info}>
            <span>
              <Image
                width={1920}
                height={1080}
                src="/icons/time-icon.svg"
                alt="time"
              />{" "}
              {duration}
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
          <span className={s.toggleText}>{isOpen ? "Згорнути" : "Показати"}{" "}</span>
          <span className={isOpen ? s.opened : ""}>{arrow}</span>
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
              <h4>Лекції:</h4>
              <ol>
                {lectures.map((l, i) => (
                  <li key={i}>
                    {++i}. {l}
                  </li>
                ))}
              </ol>
            </div>
            <div className={s.resBLock}>
              <h4>Результат:</h4>
              <p>{result}</p>
            </div>
          </div>
          <div className={s.preview}>
            <Image
              src={previewImage || "/images/program-item-video.jpg"}
              alt="Превʼю"
              width={1920}
              height={1080}
            />

            <div className={s.playButton}>▶</div>
          </div>
        </div>
      </div>
    </li>
  );
};

const arrow = (
  <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.209 3.22266C14.3504 3.47732 14.3269 3.81457 14.1387 4.04199L8.52148 10.8281V10.8271C8.48156 10.8777 8.32642 11.0606 8.0625 11.0869H7.93164C7.8088 11.0728 7.70937 11.0229 7.63965 10.9756C7.5544 10.9178 7.50043 10.8532 7.47949 10.8271L7.47852 10.8281L1.86133 4.04199V4.04102C1.67419 3.81375 1.64946 3.47879 1.79102 3.22363L1.86133 3.11914C1.97541 2.98141 2.13878 2.89955 2.31543 2.89941C2.49227 2.89941 2.65633 2.98127 2.77051 3.11914L7.90039 9.31641L7.96875 9.39941V9.49121L7.98438 9.49023L8 9.49121V9.4375L8.06934 9.35352L13.2305 3.11914C13.3446 2.98147 13.5079 2.89941 13.6846 2.89941C13.8613 2.89948 14.0245 2.9814 14.1387 3.11914L14.209 3.22266Z"
      fill="#FFF4F1"
      stroke="#FFF4F1"
      strokeWidth="0.6"
    />
  </svg>
);
