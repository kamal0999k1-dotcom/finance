
import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({ label, value, onChange, min, max, step, suffix }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.valueAsNumber);
  };
  return (
    <div>
        <div className="flex justify-between items-start mb-1 gap-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-tight flex-1">{label}</label>
            <span className="text-sm font-black text-indigo-600 whitespace-nowrap">{value}{suffix}</span>
        </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};

export default SliderInput;
