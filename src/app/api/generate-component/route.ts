import { basename, join } from 'node:path';
import AdmZip from 'adm-zip';

import Templates, { TEMPLATES_DIR } from '@/templates/templates';
import { StringHelper } from '@/utils/string';


export async function GET(request: Request) {
  const headers = new Headers();
  const { searchParams } = new URL(request.url);
  const componentName = new StringHelper(searchParams.get('componentName'));

  const { SDC } = Templates;
  headers.append('Content-Disposition', 'attachment; filename=my-component.zip');
  headers.append('Content-Type', 'application/zip');
  const filesToZip = SDC.map((file) => join(TEMPLATES_DIR, file));

  const zip = new AdmZip();
  filesToZip.forEach((file) => {
    const filename = basename(file, '.ejs')
        .replace('component', componentName.filename);

    const zipFilePath = `${componentName.filename}/${filename}`;

    zip.addLocalFile(file, componentName.filename, zipFilePath);
  });

  const zipBuffer = zip.toBuffer();

  return new Response(zipBuffer, {
    headers,
  });
}
