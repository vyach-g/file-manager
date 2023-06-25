import path from 'path';
import fs from 'fs';
import { Message } from '../Message.js';

class NavigationComponent {
  constructor(startPath) {
    this.path = startPath;
  }

  resolvePath(filename) {
    return path.resolve(this.path, filename || '');
  }

  up() {
    this.path = path.resolve(this.path, '..');
    Message.write(this.path);
  }

  cd(arg) {
    const newPath = path.resolve(this.path, arg || '');
    fs.access(newPath, fs.constants.F_OK, (err) => {
      if (err) {
        Message.operationFailed();
        Message.write(this.path);
        return;
      }
      this.path = newPath;
      Message.write(this.path);
    });
  }

  ls() {
    fs.readdir(this.path, (err, items) => {
      if (err) {
        Message.operationFailed();
        return;
      }
      const folders = [];
      const files = [];

      items.forEach((item) => {
        const itemPath = path.resolve(this.path, item);
        try {
          const stats = fs.statSync(itemPath);
          if (stats.isDirectory()) {
            folders.push(item);
          } else {
            files.push(item);
          }
        } catch {}
      });

      folders.sort((a, b) => a.localeCompare(b));
      files.sort((a, b) => a.localeCompare(b));

      Message.drawItemList(folders, files);
    });
  }
}

export { NavigationComponent };
