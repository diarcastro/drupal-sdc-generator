'use client';

import { useState, SyntheticEvent } from 'react';
import { StringHelper } from '@/utils/string';

export const SDCGenerator = () => {
  const [componentName, setComponentName] = useState('');

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
    <form className="max-w-3xl flex flex-col gap-4" onSubmit={onDownloadComponent}>
      <div className="flex flex-col gap-3">
        <label className="label">
          <span className="label-text">Component Name</span>
        </label>
        <input
          type="text"
          placeholder="Component Name"
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-pine-green"
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
        />

        <small className="text-olive-drab">
          Component name: <strong>{StringHelper.toKebabCase(componentName)}</strong>
        </small>
      </div>
      <input
        type="submit"
        onClick={onDownloadComponent}
        className="bg-pine-green hover:bg-pine-green text-white py-2 px-4 rounded-md"
        value="Download Component"
       />
    </form>
  );
};
