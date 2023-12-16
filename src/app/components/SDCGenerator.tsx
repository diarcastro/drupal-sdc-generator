'use client';

import {
  Fragment,
  SyntheticEvent,
  useContext,
} from 'react';
import { StringHelper } from '@/utils/string';
import { SDCGeneratorContext } from '@/app/contexts/SDCGeneratorProvider';
import { Text } from '@/app/components/Text';

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
        <Text label="Component Name" id="componentName" value={componentName} onChange={setComponentName} />
      </section>
    </form>
  );
};
