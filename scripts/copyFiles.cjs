const { join } = require('path');
const { copySync } = require('fs-extra');

const lib = join(__dirname, '..', 'dist');
const src = join(__dirname, '..', 'src');

const folders = [ join('server', 'views') ];

for (const folder of folders) {
  copySync(join(src, folder), join(lib, folder));
}