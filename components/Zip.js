import fs from 'fs';
import zlib from 'zlib';
import { Message } from './Message.js';

class ZipComponent {
  compress(src, dest) {
    return new Promise((res, rej) => {
      let isFailed = false;
      const inputStream = fs.createReadStream(src);
      const compressedStream = zlib.createBrotliCompress();
      const outputStream = fs.createWriteStream(dest);

      inputStream
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(compressedStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(outputStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        });

      outputStream.on('finish', () => {
        Message.write('Compression completed: ' + dest);
        res();
      });
    });
  }

  decompress(src, dest) {
    return new Promise((res, rej) => {
      let isFailed = false;
      const inputStream = fs.createReadStream(src);
      const decompressedStream = zlib.createBrotliDecompress();
      const outputStream = fs.createWriteStream(dest);

      inputStream
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(decompressedStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        })
        .pipe(outputStream)
        .on('error', (error) => {
          if (!isFailed) {
            isFailed = true;
            Message.operationFailed();
            res();
          }
        });

      outputStream.on('finish', () => {
        Message.write('Decompression completed: ' + dest);
        res();
      });
    });
  }
}

export { ZipComponent };
