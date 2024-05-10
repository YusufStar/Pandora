import React from "react";

const LabelInput = ({
                        value,
                        setValue,
                        label,
                        title
                    }: {
    value: string;
    setValue: any;
    label: string;
    title: string;
}) => {
    return (
        <div className="w-full gap-2 flex items-center mt-2 sm:mt-0 rounded-md relative">
            <input
                value={value}
                required
                onChange={(e) => setValue((prev: any) => ({...prev, [label]: e.target.value}))}
                id={label}
                className={'border w-full peer px-4 py-3 outline-0 text-sm font-medium rounded-md'}
                placeholder={' '}/>

            <label
                htmlFor={label}
                className={"text-[12px] absolute px-2 left-2 opacity-75 peer-focus:-top-1.5 -top-1.5 top-4 bg-white transition-all truncate duration-200 ease-in-out peer-placeholder-shown:top-4"}>{title}</label>
        </div>
    )
}

export default LabelInput

