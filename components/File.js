import fs from 'fs';
import { Message } from './Message.js';

class FileComponent {
  async cat(path) {
    try {
      const content = await fs.promises.readFile(path, { encoding: 'utf-8' });
      Message.write(content);
    } catch (err) {
      Message.operationFailed();
    }
  }

  async add(path) {
    try {
      await fs.promises.writeFile(path, '');
      Message.write('File created: ' + path);
    } catch (err) {
      Message.operationFailed();
    }
  }

  async rn(src, dest) {
    try {
      await fs.promises.rename(src, dest);
      Message.write('File successfully renamed: ' + dest);
    } catch (err) {
      Message.operationFailed();
    }
  }

  cp(src, dest) {
    return new Promise((res, rej) => {
      let isFailed = false;
      const readableStream = fs.createReadStream(src);
      const writableStream = fs.createWriteStream(dest);

      readableStream
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(writableStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        });

      writableStream.on('finish', () => {
        Message.write('File ' + src + ' copied successfully to ' + dest);
        res();
      });
    });
  }

  mv(src, dest) {
    return new Promise((res, rej) => {
      let isFailed = false;
      const readableStream = fs.createReadStream(src);
      const writableStream = fs.createWriteStream(dest);

      readableStream
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(writableStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        });

      writableStream.on('finish', () => {
        fs.unlink(src, (err) => {
          if (err) {
            Message.operationFailed();
            return;
          }
          Message.write('File ' + src + ' moved successfully to ' + dest);
          res();
        });
      });
    });
  }

  async rm(path) {
    try {
      await fs.promises.unlink(path);
      Message.write('File deleted: ' + path);
    } catch (err) {
      Message.operationFailed();
    }
  }
}

export { FileComponent };
