'use client'

import { FunctionComponent } from "react";
import { clsx } from "clsx";

interface CheckboxProps {
    checked: boolean;
    setChecked: (checked: boolean) => void;
}

const Checkbox: FunctionComponent<CheckboxProps> = ({ checked = false, setChecked }) => {
    const handleChange = () => {
        setChecked(!checked);
    };

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    className={clsx(
                        "appearance-none outline-none block relative text-center cursor-pointer m-auto w-5 h-5 before:rounded-sm before:block before:absolute before:content-[''] before:bg-mainAccentGreen before:w-5 before:h-5 before:border-black before:border-2 before:hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] after:block after:content-[''] after:absolute after:left-1.5 after:top-0.5 after:w-2 after:h-3 after:border-black after:border-r-2 after:border-b-2 after:origin-center after:rotate-45",
                        {
                            "after:opacity-1 before:bg-[#FF965B]": checked,
                            "after:opacity-0": !checked
                        }
                    )}
                    checked={checked}
                    onChange={handleChange}
                />
            </label>
        </>
    );
};

export default Checkbox;
