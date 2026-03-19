
import React from 'react';

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange, description }) => {
  const switchId = React.useId();
  return (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between">
            <div>
                 <label htmlFor={switchId} className="font-medium text-slate-700 cursor-pointer">
                    {label}
                </label>
                 {description && <p className="text-xs text-slate-500">{description}</p>}
            </div>
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                id={switchId}
                className="sr-only peer" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)} 
            />
            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
        </div>
    </div>
  );
};

export default Switch;
