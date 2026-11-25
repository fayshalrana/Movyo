"use client";

import React from "react";
import { cn } from "@/lib/helper/utils";

const MONTHS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export interface DatePickerProps {
  value?: string; // Standard ISO YYYY-MM-DD string
  onChange?: (value: string) => void; // Emits standard ISO YYYY-MM-DD string
  error?: string; // Validation error string to highlight state
  id?: string;
  name?: string;
  placeholder?: string; // Defaults to "Select Date of Birth"
  disabled?: boolean;
  onBlur?: () => void;
  className?: string;
  minYear?: number; // Defaults to 1920
  maxYear?: number; // Defaults to currentYear - 18 (e.g. for age limit)
}

export function DatePicker({
  value,
  onChange,
  error,
  id,
  name,
  placeholder,
  disabled,
  onBlur,
  className,
  minYear,
  maxYear,
}: DatePickerProps) {
  const [dobDisplay, setDobDisplay] = React.useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"days" | "years" | "months">(
    "days",
  );

  // pickerDate represents the month/year currently visible in the active date picker viewport
  const [pickerDate, setPickerDate] = React.useState<Date>(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    // Default fallback to June 1995 for smooth scrolling
    return new Date(1995, 5, 1);
  });

  const calendarContainerRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Close calendar popover on clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarContainerRef.current &&
        !calendarContainerRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update active month/year viewport and visual text display whenever incoming value prop changes
  React.useEffect(() => {
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      const monthName = MONTHS_LIST[m - 1] || "";
      setDobDisplay(`${monthName}, ${d} ${y}`);
      setPickerDate(new Date(y, m - 1, 1));
    } else if (!value) {
      // Only clear if the input is not actively focused (to avoid wiping incomplete typed edits)
      if (document.activeElement !== inputRef.current) {
        setDobDisplay("");
      }
    }
  }, [value]);

  // List of years from minYear to maxYear for quick birth year jump
  const yearsList = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const min = minYear ?? 1920;
    const max = maxYear ?? currentYear - 18;
    const years = [];
    for (let y = max; y >= min; y--) {
      years.push(y);
    }
    return years;
  }, [minYear, maxYear]);

  // Calculate the 42 days grid cells for a standard 6-row calendar layout
  const daysGrid = React.useMemo(() => {
    const year = pickerDate.getFullYear();
    const month = pickerDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // index 0-6 (Sun-Sat)
    const prevMonthDays = new Date(year, month, 0).getDate();

    const cells: { day: number; monthOffset: number; isSelected: boolean }[] =
      [];

    // Selected day markers
    let selYear = 0,
      selMonth = 0,
      selDay = 0;
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-").map(Number);
      selYear = y;
      selMonth = m - 1;
      selDay = d;
    }

    // 1. Previous month days (pad start)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push({
        day: prevMonthDays - i,
        monthOffset: -1,
        isSelected: false,
      });
    }

    // 2. Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = selYear === year && selMonth === month && selDay === d;
      cells.push({
        day: d,
        monthOffset: 0,
        isSelected,
      });
    }

    // 3. Next month days (pad end to fill exactly 42 slots)
    const totalCells = 42;
    const nextMonthDaysNeeded = totalCells - cells.length;
    for (let d = 1; d <= nextMonthDaysNeeded; d++) {
      cells.push({
        day: d,
        monthOffset: 1,
        isSelected: false,
      });
    }

    return cells;
  }, [pickerDate, value]);

  // Navigation handlers
  const handlePrevMonth = () => {
    setPickerDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setPickerDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleSelectYear = (year: number) => {
    setPickerDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(year);
      return newDate;
    });
    setViewMode("days");
  };

  const handleSelectMonth = (monthIndex: number) => {
    setPickerDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
    setViewMode("days");
  };

  const handleSelectDay = (day: number, monthOffset: number) => {
    let year = pickerDate.getFullYear();
    let month = pickerDate.getMonth() + monthOffset;

    // Adjust year/month if clicking padding days
    if (month < 0) {
      month = 11;
      year--;
    } else if (month > 11) {
      month = 0;
      year++;
    }

    const isoDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (onChange) {
      onChange(isoDate);
    }
    setIsCalendarOpen(false);
  };

  // Auto-formatting handler for manual MM/DD/YYYY typed text entry
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const clean = rawVal.replace(/\D/g, "");
    let formatted = "";

    if (clean.length > 0) {
      const mm = clean.slice(0, 2);
      const dd = clean.slice(2, 4);
      const yyyy = clean.slice(4, 8);

      if (clean.length <= 2) {
        formatted = mm;
      } else if (clean.length <= 4) {
        formatted = `${mm}/${dd}`;
      } else {
        formatted = `${mm}/${dd}/${yyyy}`;
      }
    }

    setDobDisplay(formatted);

    // If complete (8 digits), emit valid ISO date, otherwise emit empty string
    if (clean.length === 8) {
      const mm = clean.slice(0, 2);
      const dd = clean.slice(2, 4);
      const yyyy = clean.slice(4, 8);
      const formattedDate = `${yyyy}-${mm}-${dd}`;
      if (onChange) {
        onChange(formattedDate);
      }
    } else {
      if (onChange) {
        onChange("");
      }
    }
  };

  return (
    <div
      ref={calendarContainerRef}
      className="flex flex-col gap-1 w-full relative"
    >
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          disabled={disabled}
          placeholder={placeholder || "Select Date of Birth"}
          value={dobDisplay}
          onChange={handleBirthdayChange}
          onFocus={() => {
            if (!disabled) {
              setIsCalendarOpen(true);
              setViewMode("days");
            }
          }}
          onClick={() => {
            if (!disabled) {
              setIsCalendarOpen(true);
              setViewMode("days");
            }
          }}
          onBlur={onBlur}
          className={cn(
            "w-full h-[46px] border rounded-[12px] pl-[16px] pr-[44px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 text-[#111111]",
            error
              ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
              : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
        />
        {/* Elegant Clickable Calendar Icon */}
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              setIsCalendarOpen((prev) => !prev);
              setViewMode("days");
            }
          }}
          className={cn(
            "absolute right-[12px] p-1.5 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors focus:outline-none",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={error ? "#F43F5E" : "currentColor"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </button>
      </div>

      {/* Calendar Picker Popover Dropdown */}
      {isCalendarOpen && !disabled && (
        <div className="absolute z-50 mt-1 top-full left-0 right-0 sm:right-auto sm:w-[320px] bg-white border border-[#E2E8F0] rounded-[16px] shadow-2xl p-4 flex flex-col gap-3 transition-all duration-200 select-none animate-in fade-in slide-in-from-top-2 duration-200">
          {viewMode === "days" && (
            <>
              {/* Days View Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewMode("months")}
                    className="text-[14px] font-semibold text-[#022348] hover:bg-slate-100 px-2 py-1 rounded-md transition-colors duration-150 flex items-center gap-1.5"
                  >
                    {MONTHS_LIST[pickerDate.getMonth()]}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-slate-400"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("years")}
                    className="text-[14px] font-semibold text-[#022348] hover:bg-slate-100 px-2 py-1 rounded-md transition-colors duration-150 flex items-center gap-1.5"
                  >
                    {pickerDate.getFullYear()}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-slate-400"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors duration-150"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors duration-150"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Weekday Grid */}
              <div className="grid grid-cols-7 gap-1 text-center py-1 border-b border-slate-100 mb-0.5">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <span
                    key={day}
                    className="text-[11px] font-medium text-slate-400"
                  >
                    {day}
                  </span>
                ))}
              </div>

              {/* Days Cells Grid */}
              <div className="grid grid-cols-7 gap-1">
                {daysGrid.map((cell, index) => {
                  const isCurrentMonth = cell.monthOffset === 0;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        handleSelectDay(cell.day, cell.monthOffset)
                      }
                      className={cn(
                        "h-8 text-xs font-medium rounded-full transition-all duration-150 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#0659C4]/30",
                        cell.isSelected
                          ? "bg-[#0659C4] text-white font-semibold shadow-sm"
                          : isCurrentMonth
                            ? "text-slate-700 hover:bg-slate-100 cursor-pointer"
                            : "text-slate-300 hover:bg-slate-50 cursor-pointer",
                      )}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === "months" && (
            <>
              {/* Months View Header */}
              <div className="flex items-center gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setViewMode("days")}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors duration-150"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span className="text-[14px] font-semibold text-[#022348]">
                  Select Month
                </span>
              </div>

              {/* Months Grid */}
              <div className="grid grid-cols-3 gap-2 py-1">
                {MONTHS_LIST.map((month, idx) => {
                  const isSelected = pickerDate.getMonth() === idx;
                  return (
                    <button
                      key={month}
                      type="button"
                      onClick={() => handleSelectMonth(idx)}
                      className={cn(
                        "py-2.5 text-xs rounded-xl transition-all duration-150 text-center font-medium border focus:outline-none focus:ring-1 focus:ring-[#0659C4]/30",
                        isSelected
                          ? "bg-[#0659C4] border-[#0659C4] text-white shadow-sm font-semibold"
                          : "text-slate-700 border-slate-100 hover:bg-slate-50 hover:border-slate-200",
                      )}
                    >
                      {month.slice(0, 3)}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === "years" && (
            <>
              {/* Years View Header */}
              <div className="flex items-center gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setViewMode("days")}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors duration-150"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <span className="text-[14px] font-semibold text-[#022348]">
                  Select Year
                </span>
              </div>

              {/* Years Grid */}
              <div className="grid grid-cols-4 gap-2 py-1 max-h-[220px] overflow-y-auto premium-scrollbar pr-1">
                {yearsList.map((year) => {
                  const isSelected = pickerDate.getFullYear() === year;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleSelectYear(year)}
                      className={cn(
                        "py-2 text-xs rounded-lg transition-all duration-150 text-center font-medium border focus:outline-none focus:ring-1 focus:ring-[#0659C4]/30",
                        isSelected
                          ? "bg-[#0659C4] border-[#0659C4] text-white shadow-sm font-semibold"
                          : "text-slate-700 border-slate-100 hover:bg-slate-50 hover:border-slate-200",
                      )}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Visual error message block matching input style schema */}
      {error && (
        <span className="text-xs text-rose-500 px-1 font-medium">{error}</span>
      )}
    </div>
  );
}
