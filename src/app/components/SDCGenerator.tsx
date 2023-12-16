'use client';

import {
  Fragment,
  SyntheticEvent,
  useContext,
} from 'react';

import _map from 'lodash/map';
import { StringHelper } from '@/utils/string';
import { SDCGeneratorContext, SDCStatus } from '@/app/contexts/SDCGeneratorProvider';
import { Text } from '@/app/components/Text';

export const SDCGenerator = () => {
  const {
    componentName,
    setComponentName,
    setStatus,
    status,
  } = useContext(SDCGeneratorContext);

  const onDownloadComponent = async (formEvent: SyntheticEvent) => {
    console.log('onDownloadComponent');

    formEvent.preventDefault();
    if (componentName) {
      const data = {
        componentName,
        status,
      };
      const params = new URLSearchParams(data);
      const response = await fetch(`/api/generate-component?${params}`);
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

  const statusOptions = _map(SDCStatus, (statusOption, statusOptionKey) => {
    return (
      <option key={statusOptionKey} value={statusOption}>
        {statusOption}
      </option>
    )
  });

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
                { status }
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
        <div className="flex flex-row gap-4 items-center">
          <div className="grow">
            <Text label="Component Name" id="componentName" value={componentName} onChange={setComponentName} />
          </div>
          {
            componentName && (
              <div className="relative">
                <select id="status" name="status"
                        onChange={(e) => setStatus(e.target.value as SDCStatus)}
                        defaultValue={status}
                        className="text-center bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-olive-drab block w-full px-2.5 pb-2.5 pt-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-olive-drab">
                  {statusOptions}
                </select>
                <label
                  htmlFor="status"
                  className="absolute text-sm rounded-md text-pine-green dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/50 backdrop-blur-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-olive-drab peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                  Status
                </label>
              </div>
            )
          }
        </div>
      </section>
    </form>
  );
};
