import path from 'path';
import fs from 'fs';
import { Message } from './Message.js';

class NavigationComponent {
  constructor(startPath) {
    this.path = startPath;
  }

  resolvePath(filename) {
    return path.resolve(this.path, filename || '');
  }

  replaceName(filePath, name) {
    const directory = path.dirname(filePath);
    return path.resolve(directory, name || '');
  }

  addFilename(filePath, directory = '.') {
    const name = path.basename(filePath);
    return path.resolve(this.path, directory, name);
  }

  addZipExt(filePath, directory = '.') {
    const name = path.basename(filePath) + '.br';
    return path.resolve(this.path, directory, name);
  }

  removeZipExt(filePath, directory = '.') {
    const name = path.basename(filePath).replace('.br', '');
    return path.resolve(this.path, directory, name);
  }

  up() {
    this.path = path.resolve(this.path, '..');
    Message.write(this.path);
  }

  async cd(arg) {
    try {
      const newPath = path.resolve(this.path, arg || '');
      await fs.promises.access(newPath, fs.constants.F_OK);
      this.path = newPath;
    } catch (err) {
      Message.operationFailed();
    }
  }

  async ls() {
    try {
      const items = await fs.promises.readdir(this.path, {
        withFileTypes: true,
      });
      const folders = [];
      const files = [];

      items.forEach((item) => {
        if (item.isDirectory()) {
          folders.push(item.name);
        } else {
          files.push(item.name);
        }
      });

      folders.sort((a, b) => a.localeCompare(b));
      files.sort((a, b) => a.localeCompare(b));

      Message.drawItemList(folders, files);
    } catch (err) {
      Message.operationFailed();
    }
  }
}

export { NavigationComponent };
