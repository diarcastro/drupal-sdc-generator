import { join } from 'node:path';

const Templates = {
  SDC: [
    'sdc/component.component.yml.ejs',
    'sdc/component.css.ejs',
    'sdc/component.js.ejs',
    'sdc/component.twig.ejs',
    'sdc/README.md.ejs',
  ],
};


export const TEMPLATES_DIR = join(process.cwd(), '/src/templates');

export default Templates;
