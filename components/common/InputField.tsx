
import React from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, prefix, suffix }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.valueAsNumber;
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (e.target.value === '') {
        onChange(0);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">{prefix}</span>}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          className={`w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
};

export default InputField;
