const ToggleSwitch = () => {

    return (
        <label className="relative inline-flex justify-center items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div
                className="
          w-11 h-6
          bg-gray-400
          rounded-full
          border-2 border-black
          peer-checked:bg-mainAccentGreen
          peer-checked:shadow-[2px_2px_0px_rgba(0,0,0,1)]
          after:content-['']
          after:absolute
          after:top-[4px]
          after:left-[4px]
          after:w-4
          after:h-4
          after:bg-white
          after:rounded-full
          after:border-2
          after:border-black
          after:transition-all
          peer-checked:after:translate-x-5
        "
            ></div>
        </label>
    );
};

export default ToggleSwitch;

