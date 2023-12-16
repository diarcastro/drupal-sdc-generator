'use client';

import {
  Fragment,
  SyntheticEvent,
  useContext,
} from 'react';
import { StringHelper } from '@/utils/string';
import { SDCGeneratorContext } from '@/app/contexts/SDCGeneratorProvider';

export const SDCGenerator = () => {
  const {
    componentName,
    setComponentName,
  } = useContext(SDCGeneratorContext);

  const onDownloadComponent = async (formEvent: SyntheticEvent) => {
    console.log('onDownloadComponent');

    formEvent.preventDefault();
    if (componentName) {
      const response = await fetch(`/api/generate-component?componentName=${componentName}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${StringHelper.toKebabCase(componentName)}--sdc.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
    }

    return false;
  };

  return (
    <form className="max-w-5 xl flex flex-row gap-4 w-full flex-wrap items-start" onSubmit={onDownloadComponent}>
      <header className="w-full p-5 border-b-2 border-pine-green flex flex-row justify-between mb-4 items-center">
        {
          componentName && (
            <Fragment>
              <h1 className="text-2xl font-bold text-pine-green flex flex-row gap-4 items-center">
                {componentName}
                <span className="text-xs bg-gray-200 font-normal rounded-md p-1">
                  &lt;
                  {StringHelper.toKebabCase(componentName)}
                  &gt;
                </span>
              </h1>
              <div className="text-pine-green text-sm">
                status
              </div>
            </Fragment>
          )
        }
        {
          !componentName && (
            <Fragment>
              <h1 className="text-2xl font-bold text-gray-400">
                No Component Name typed yet!
              </h1>
            </Fragment>
          )
        }
      </header>
      <aside className="w-74 bg-robin-egg-blue/20 rounded-lg p-5 h-auto">
        <input
          type="submit"
          onClick={onDownloadComponent}
          className="bg-pine-green hover:bg-pine-green text-white py-2 px-4 rounded-md w-full cursor-pointer"
          value="Download Component"
        />
      </aside>
      <section className="grow">
        <div className="relative">
          <input
            type="text" id="componentName"
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-olive-drab focus:outline-none focus:ring-0 focus:border-olive-drab peer"
            placeholder=" "
          />
          <label
            htmlFor="componentName"
            className="absolute text-sm rounded-md text-pine-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/50 backdrop-blur-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-olive-drab peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
            Component Name
          </label>
        </div>
      </section>
    </form>
  );
};
