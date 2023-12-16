import { basename, join } from 'node:path';
import AdmZip from 'adm-zip';
import ejs from 'ejs';

import Templates, { TEMPLATES_DIR } from '@/templates/templates';
import { StringHelper } from '@/utils/string';


export async function GET(request: Request) {
  const headers = new Headers();
  const { searchParams } = new URL(request.url);
  const componentName = new StringHelper(searchParams.get('componentName'));
  const status = new StringHelper(searchParams.get('status'));

  const ejsOptions = {};
  const data = {
    componentName,
    status,
  };


  const { SDC } = Templates;

  const filesToZip = SDC.map((file) => join(TEMPLATES_DIR, file));

  const zip = new AdmZip();
  filesToZip.forEach((file) => {
    const filename = basename(file, '.ejs')
      .replace('component', componentName.filename);

    ejs.renderFile(file, data, ejsOptions, (err, str) => {
      if (err) {
        console.error(err);
        return;
      }

      // const zipFilePath = `${componentName.filename}/${filename}`;
      zip.addFile(filename, Buffer.from(str));
    });
    // const zipFilePath = `${componentName.filename}/${filename}`;

    // zip.addLocalFile(file, componentName.filename, zipFilePath);
  });

  const zipBuffer = zip.toBuffer();

  // headers.append('Content-Type', 'application/json');
  // return new Response(JSON.stringify(status), {
  //   headers,
  // });

  headers.append('Content-Disposition', `attachment; filename=${componentName.filename}.zip`);
  headers.append('Content-Type', 'application/zip');
  return new Response(zipBuffer, {
    headers,
  });
}
