import Link from "next/link";
import React from "react";
import s from "./Breadcrumbs.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export const Breadcrumbs = ({ items, colorScheme = "dark" }: { items: BreadcrumbItem[]; colorScheme?: "dark" | "light" }) => {
  return (
    <nav className={s.breadcrumbs + " " + (colorScheme === "light" ? s.light : s.dark)} aria-label="breadcrumbs">
      {items.map((item, idx) => (
        <React.Fragment key={item.label + idx}>
          {item.href && !item.active ? (
            <Link href={item.href} className={s.link}>
              {item.label}
            </Link>
          ) : (
            <span className={item.active ? s.active : s.link}>{item.label}</span>
          )}
          {idx < items.length - 1 && <span className={s.dot}>•</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}; 