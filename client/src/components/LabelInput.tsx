'use client'
import React from "react";

const LabelInput = ({
                        value,
                        setValue,
                        label,
                        title,
                        formater
                    }: {
    value: string;
    setValue: any;
    label: string;
    title: string;
    formater?: 'tel' | 'cardNumber' | 'cardExpirationDate' | 'cvc'
}) => {
    const normalizeInput = (value: string, previousValue: string) => {
        if (formater === null || formater === undefined) return value

        // return nothing if no value
        if (!value) return value;

        if (formater === "tel") {
            // only allows 0-9 inputs
            const currentValue = value.replace(/[^\d]/g, '');
            const telLength = currentValue.length;

            if (telLength > 10) return previousValue;

            if (!previousValue || value.length > previousValue.length) {

                // returns: "x", "xx", "xxx"
                if (telLength < 4) return currentValue;

                // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
                if (telLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

                // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
                if (telLength < 11) {
                    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)} ${currentValue.slice(6, 8)} ${currentValue.slice(8)}`;
                } else {
                    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)} ${currentValue.slice(6, 9)} ${currentValue.slice(9, 11)} ${currentValue.slice(11)}`;
                }
            }
        } else if (formater === "cardNumber") {
            // Remove non-digit characters
            const currentValue = value.replace(/[^\d]/g, '');

            // Limit input to 16 characters
            const limitedValue = currentValue.slice(0, 16);

            const cvLength = limitedValue.length;

            // Split the string into groups of 4 characters
            let formattedValue = '';
            for (let i = 0; i < cvLength; i += 4) {
                formattedValue += limitedValue.slice(i, i + 4) + ' ';
            }

            // Trim any extra space at the end
            formattedValue = formattedValue.trim();

            return formattedValue;
        } else if (formater === "cardExpirationDate") {
            const currentValue = value.replace(/[^\d]/g, ''); // Remove non-digit characters
            const cvLength = currentValue.length;

            if (!previousValue || value.length > previousValue.length) {
                // Format input as "MM / YY"
                if (cvLength <= 2) {
                    return currentValue;
                } else {
                    const month = currentValue.slice(0, 2);
                    const year = currentValue.slice(2, 4);
                    return `${month} / ${year}`;
                }
            }
        } else if (formater === "cvc") {
            // Remove non-digit characters
            const currentValue = value.replace(/[^\d]/g, '');

            // Limit input to 3 characters
            const limitedValue = currentValue.slice(0, 3);

            return limitedValue;
        }
    };

    return (
        <div className="w-full gap-2 flex items-center mt-2 sm:mt-0 rounded-md relative">
            <input
                type={formater === "tel" ? "tel" : "text"}
                value={value}
                required
                onChange={(e) => {
                    setValue((prev: any) => ({...prev, [label]: normalizeInput(e.target.value, value)}))
                }}
                id={label}
                className={'bg-white border w-full peer px-4 py-3 outline-0 text-sm font-medium rounded-md'}
                placeholder={' '}/>

            <label
                htmlFor={label}
                className={"text-[12px] absolute px-2 left-2 opacity-75 peer-focus:-top-1.5 -top-1.5 bg-white transition-all truncate duration-200 ease-in-out peer-placeholder-shown:top-4"}>{title}</label>
        </div>
    )
}

export default LabelInput

