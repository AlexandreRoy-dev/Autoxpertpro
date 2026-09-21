"use client";

import { formatDate } from "@/lib/format";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

function toKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function DateField({
  value,
  onChange,
  locale,
}: {
  value: string;
  onChange: (value: string) => void;
  locale: "fr" | "en";
}) {
  const t = useTranslations("entretien");
  const weekStartsOn = locale === "fr" ? 1 : 0;
  const selected = value ? parseKey(value) : null;
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => selected ?? new Date());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) setCursor(selected);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const monthLabel = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    month: "long",
    year: "numeric",
  }).format(cursor);

  const weekdays = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
      weekday: "short",
    });
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(2024, 0, 7 + weekStartsOn + index);
      return formatter.format(date).replace(".", "");
    });
  }, [locale, weekStartsOn]);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() - weekStartsOn + 7) % 7;
    const count = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: startOffset + count }, (_, index) => {
      if (index < startOffset) return null;
      const day = index - startOffset + 1;
      return { day, key: toKey(year, month, day) };
    });
  }, [cursor, weekStartsOn]);

  const shiftMonth = (delta: number) => {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  return (
    <div className="datefield" ref={rootRef}>
      <button
        type="button"
        className="datefield-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={value ? "" : "text-muted"}>{value ? formatDate(value, locale) : t("pickDate")}</span>
      </button>
      {open ? (
        <div className="datepicker" role="dialog" aria-label={t("date")}>
          <div className="datepicker-nav">
            <button type="button" onClick={() => shiftMonth(-1)} aria-label={t("prevMonth")}>
              ‹
            </button>
            <p>{monthLabel}</p>
            <button type="button" onClick={() => shiftMonth(1)} aria-label={t("nextMonth")}>
              ›
            </button>
          </div>
          <div className="datepicker-week">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="datepicker-grid">
            {days.map((cell, index) =>
              cell ? (
                <button
                  type="button"
                  key={cell.key}
                  className={`datepicker-day${cell.key === value ? " is-selected" : ""}`}
                  onClick={() => {
                    onChange(cell.key);
                    setOpen(false);
                  }}
                >
                  {cell.day}
                </button>
              ) : (
                <span key={`empty-${index}`} />
              ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
