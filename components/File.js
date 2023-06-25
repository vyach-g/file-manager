import fs from 'fs';
import { Message } from '../Message.js';

class FileComponent {
  cat(path) {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        Message.operationFailed();
        return;
      }
      console.log(data);
    });
  }

  add(path) {
    fs.writeFile(path, '', (err) => {
      if (err) {
        Message.operationFailed();
        return;
      }
      console.log('File created: ' + path);
    });
  }

  rn(src, dest) {
    fs.rename(src, dest, (err) => {
      if (err) {
        Message.operationFailed();
        return;
      }
      console.log('File successfully renamed: ' + dest);
    });
  }

  cp(src, dest) {
    const readableStream = fs.createReadStream(src);
    const writableStream = fs.createWriteStream(dest);

    readableStream.pipe(writableStream);
    writableStream.on('finish', () => {
      console.log('File ' + src + ' copied successfully to ' + dest);
    });

    readableStream.on('error', (error) => {
      Message.operationFailed();
    });

    writableStream.on('error', (error) => {
      Message.operationFailed();
    });
  }

  mv(src, dest) {
    const readableStream = fs.createReadStream(src);
    const writableStream = fs.createWriteStream(dest);

    readableStream.pipe(writableStream);
    writableStream.on('finish', () => {
      fs.unlink(src, (err) => {
        if (err) {
          Message.operationFailed();
          return;
        }
      });

      console.log('File ' + src + ' moved successfully to ' + dest);
    });

    readableStream.on('error', (error) => {
      Message.operationFailed();
    });

    writableStream.on('error', (error) => {
      Message.operationFailed();
    });
  }

  rm(path) {
    fs.unlink(path, (err) => {
      if (err) {
        Message.operationFailed();
        return;
      }
      console.log('File deleted: ' + path);
    });
  }
}

export { FileComponent };
