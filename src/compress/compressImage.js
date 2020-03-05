const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const baseUrl = 'src/assets/images';
const targetUrl = 'src/assets/compress';
const shell = require('shelljs');

const compress = (baseDir, target) => {
  // 这里只能使用/正斜杠不能用反斜杠，但是mapDir给的是反斜杠
  imagemin([`${baseDir.replace(/\\/g, '/')}/*.{jpg,png}`], {
    destination: target.replace(/\\/g, '/'),
    plugins: [imageminMozjpeg(), imageminPngquant({ quality: [0.6, 0.8] })]
  }).then(files => {
    files.forEach(item => {
      console.log(item.destinationPath);
    });
    console.log(
      chalk.greenBright(
        `${baseDir}文件夹图片压缩成功，共有${files.length}张图片`
      )
    );
  });
};
let baseUrlArray = [];
const mapDir = (baseDir, dir = '') => {
  fs.readdir(path.join(__dirname, `../../${baseDir}`, dir), (err, files) => {
    if (err) {
      console.error(err);
    }
    files.forEach(file => {
      let pathname = path.join(__dirname, `../../${baseDir}`, dir, file);
      fs.stat(pathname, (err, stats) => {
        if (err) {
          console.error('获取文件stat失败');
        }
        if (stats.isDirectory()) {
          //如果是文件夹的话，递归
          mapDir(baseDir, file);
        } else {
          if (!baseUrlArray.includes(`/${dir}`)) {
            //   同一个目录下只需要压缩一次即可
            baseUrlArray.push(`/${dir}`);
            compress(path.join(baseDir, dir), path.join(targetUrl, dir));
          }
        }
      });
    });
  });
};

// const rmdir = (dir, callback) => {
//   fs.readdir(dir, (err, files) => {
//     /**
//      * @desc 内部循环遍历使用的工具函数
//      * @param {Number} index 表示读取files的下标
//      */
//     function next(index) {
//       // 如果index 等于当前files的时候说明循环遍历已经完毕，可以删除dir，并且调用callback
//       if (index == files.length) return fs.rmdir(dir, callback);
//       // 如果文件还没有遍历结束的话，继续拼接新路径，使用fs.stat读取该路径
//       let newPath = path.join(dir, files[index]);
//       // 读取文件，判断是文件还是文件目录

//       fs.stat(newPath, (err, stat) => {
//         if (stat.isDirectory()) {
//           // 因为我们这里是深度循环，也就是说遍历玩files[index]的目录以后，才会去遍历files[index+1]
//           // 所以在这里直接继续调用rmdir，然后把循环下一个文件的调用放在当前调用的callback中
//           rmdir(newPath, () => next(index + 1));
//         } else {
//           // 如果是文件，则直接删除该文件，然后在回调函数中调用遍历nextf方法，并且index+1传进去
//           fs.unlink(newPath, () => next(index + 1));
//         }
//       });
//     }
//     next(0);
//   });
// };

const rmdir = (dir, callback) => {
  shell.rm('-r', dir);
  callback();
};

// 删除压缩文件目录，防止留下无用的文件
rmdir(path.join(__dirname, `../../${targetUrl}`), () => {
  console.log(chalk.greenBright('原压缩文件夹已删除'));
  mapDir(baseUrl);
});
