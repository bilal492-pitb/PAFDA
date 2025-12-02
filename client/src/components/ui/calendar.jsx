import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar({ className, showOutsideDays = true, ...props }) {
  return (
    <div className={`bg-white border rounded p-3 ${className || ''}`}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className="w-100"
        components={{
          IconLeft: (props) => <ChevronLeft size={16} {...props} />,
          IconRight: (props) => <ChevronRight size={16} {...props} />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";