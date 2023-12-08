'use client';

export const DownloadButton = () => {
  const onDownloadClick = async () => {
    const response = await fetch('/api/generate-component');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-component.zip';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return <button onClick={onDownloadClick}>Download Component</button>;
};
