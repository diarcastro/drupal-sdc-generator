import { basename, join } from 'node:path';
import AdmZip from 'adm-zip';

import Templates, { TEMPLATES_DIR } from '@/templates/templates';


export async function GET() {
  const { SDC } = Templates;
  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename=my-component.zip');
  headers.append('Content-Type', 'application/zip');
  const filesToZip = SDC.map((file) => join(TEMPLATES_DIR, file));

  const zip = new AdmZip();
  filesToZip.forEach((file) => {
    const filename = basename(file, '.ejs');
    zip.addLocalFile(file, '', filename);
  });

  const zipBuffer = zip.toBuffer();

  return new Response(zipBuffer, {
    headers,
  });
}
