const shell = require('shelljs');
const ERROR_FILE_NAME = 'console.log';
let _errorList = [];

let checkFile = ['public', 'vue.config.js'];
// 先删除文件
// shell.ls '-R'递归处理目录列表
if (shell.ls('-R', 'check').includes(ERROR_FILE_NAME))
  shell.rm(`${__dirname}/${ERROR_FILE_NAME}`);

function getLog() {
  let _cmd = `git diff ${checkFile[0]}`;
  return new Promise((resolve, reject) => {
    // exec执行传入的指令
    shell.exec(_cmd, (code, stdout, stderr) => {
      if (code) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

function check() {
  if (checkFile.length == 0) {
    if (_errorList.length !== 0) {
      console.log(_errorList);
      shell.echo(_errorList).to(`${__dirname}/${ERROR_FILE_NAME}`);
      throw new Error(
        "\x1b[40m \x1b[31m 项目重要文件不能修改，请查看'check/console.log'文件,并恢复相关文件 \x1b[0m"
      );
    }
    console.log('\x1b[32m 文件校验成功:项目重要文件没有修改 \x1b[0m');
  } else {
    getLog()
      .then(_gitLog => {
        if (!!_gitLog) {
          _errorList.push(_gitLog);
        }
        checkFile.shift();
        check();
      })
      .catch(err => {
        console.error(err);
      });
  }
}
check();
