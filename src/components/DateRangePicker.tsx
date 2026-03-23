import { useState } from "react";
import { format, subDays, startOfDay, startOfMonth, subMonths, startOfWeek } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange as AnalyticsDateRange } from "@/lib/analytics";

interface DateRangePickerProps {
  onChange: (range: AnalyticsDateRange, label: string) => void;
}

const PRESETS = [
  {
    label: "Today",
    getRange: () => ({ from: startOfDay(new Date()), to: new Date() }),
  },
  {
    label: "Yesterday",
    getRange: () => {
      const y = subDays(new Date(), 1);
      return { from: startOfDay(y), to: new Date(y.getFullYear(), y.getMonth(), y.getDate(), 23, 59, 59) };
    },
  },
  {
    label: "This Week",
    getRange: () => ({ from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: new Date() }),
  },
  {
    label: "Last 7 Days",
    getRange: () => ({ from: startOfDay(subDays(new Date(), 7)), to: new Date() }),
  },
  {
    label: "Last 30 Days",
    getRange: () => ({ from: startOfDay(subDays(new Date(), 30)), to: new Date() }),
  },
  {
    label: "This Month",
    getRange: () => ({ from: startOfMonth(new Date()), to: new Date() }),
  },
  {
    label: "Last Month",
    getRange: () => {
      const s = startOfMonth(subMonths(new Date(), 1));
      const e = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59);
      return { from: s, to: e };
    },
  },
  {
    label: "Last 90 Days",
    getRange: () => ({ from: startOfDay(subDays(new Date(), 90)), to: new Date() }),
  },
  {
    label: "All Time",
    getRange: () => ({ from: undefined as Date | undefined, to: undefined as Date | undefined }),
  },
];

export function DateRangePicker({ onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("All Time");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectingFrom, setSelectingFrom] = useState(true);

  const displayLabel = () => {
    if (!fromDate && !toDate) return activePreset || "All Time";
    const parts: string[] = [];
    if (fromDate) parts.push(format(fromDate, "MMM d, yyyy"));
    if (toDate) parts.push(format(toDate, "MMM d, yyyy"));
    return parts.join(" – ");
  };

  const handlePreset = (preset: (typeof PRESETS)[number]) => {
    const { from, to } = preset.getRange();
    setFromDate(from);
    setToDate(to);
    setActivePreset(preset.label);
    onChange(
      {
        from: from?.toISOString(),
        to: to?.toISOString(),
      },
      preset.label
    );
    setOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (selectingFrom) {
      setFromDate(date);
      setToDate(undefined);
      setSelectingFrom(false);
      setActivePreset("");
    } else {
      const newTo = date < fromDate! ? fromDate! : date;
      const newFrom = date < fromDate! ? date : fromDate!;
      setFromDate(newFrom);
      setToDate(newTo);
      setSelectingFrom(true);
      setActivePreset("");
      onChange(
        {
          from: newFrom.toISOString(),
          to: new Date(newTo.getFullYear(), newTo.getMonth(), newTo.getDate(), 23, 59, 59).toISOString(),
        },
        `${format(newFrom, "MMM d")} – ${format(newTo, "MMM d")}`
      );
      setOpen(false);
    }
  };

  const selectedRange = fromDate && toDate ? { from: fromDate, to: toDate } : fromDate ? { from: fromDate, to: fromDate } : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 text-xs gap-2 px-3 font-medium min-w-[180px] justify-start",
            !fromDate && !toDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
          {displayLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
        <div className="flex">
          {/* Presets sidebar */}
          <div className="border-r border-border p-2 flex flex-col gap-0.5 min-w-[130px]">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset)}
                className={cn(
                  "text-left text-xs px-3 py-1.5 rounded-md transition-colors whitespace-nowrap",
                  activePreset === preset.label
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Dual calendar */}
          <div className="p-2">
            <p className="text-[10px] text-muted-foreground px-3 pb-1 font-medium">
              {selectingFrom ? "Select start date" : "Select end date"}
            </p>
            <div className="flex gap-2">
              <Calendar
                mode="single"
                selected={selectingFrom ? fromDate : toDate}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date()}
                defaultMonth={subMonths(new Date(), 1)}
                modifiers={selectedRange ? { range: { from: selectedRange.from, to: selectedRange.to } } : {}}
                modifiersClassNames={{ range: "bg-primary/10 text-primary" }}
                className="p-2 pointer-events-auto"
              />
              <Calendar
                mode="single"
                selected={selectingFrom ? fromDate : toDate}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date()}
                modifiers={selectedRange ? { range: { from: selectedRange.from, to: selectedRange.to } } : {}}
                modifiersClassNames={{ range: "bg-primary/10 text-primary" }}
                className="p-2 pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
