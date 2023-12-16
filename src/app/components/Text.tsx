export interface TextProps {
  id: string;
  value: string;
  label: string;
  onChange: (value: string) => void;
}

export const Text = ({
                       id,
                       label,
                       value,
                       onChange,
                     }: TextProps) => {
  return (
    <div className="relative">
      <input
        type="text" id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-olive-drab focus:outline-none focus:ring-0 focus:border-olive-drab peer"
        placeholder=" "
      />
      <label
        htmlFor="componentName"
        className="absolute text-sm rounded-md text-pine-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/50 backdrop-blur-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-olive-drab peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {label}
      </label>
    </div>
  );
};
