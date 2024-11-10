import React from 'react';

function Labelandinput({ type, label, name, value,labelclass, onChange }) {
    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className={labelclass}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                className='mb-3 text-xl bg-slate-700 border'
                onChange={onChange}
            />
        </div>
    );
}

export default Labelandinput;
