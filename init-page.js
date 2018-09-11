const fs = require('fs');
const inquirer = require('inquirer');
const rem = require('./build/rem').rem

const generateFile = (fileName, title, platform) => {
  let html = `<!DOCTYPE html><html><head>
                  <meta charset='UTF-8'>
                  <title>${title}</title>
                  <meta name='viewport' content='width=750, user-scalable=no, target-densitydpi=device-dpi'>
                  ${platform === 'web' ? '' : '<style type="text/css">html, body {font-size: 100px;}</style><script src="https://cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js"></script>'}
                  ${platform === 'web' ? '' : rem }  
                </head>
                <body>
                  <div class='header'>
                  </div>
                  <div class='content'>
                  </div>
                  ${platform === 'web' ? '<script src="https://cdn.bootcss.com/jquery/3.3.0/jquery.min.js"></script>' : '<script src="//cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>'}
                </body>
              </html>
              `;

  let css = `@import 'base.scss';
            @import 'var.scss';
            `;

  let js = `require('../../css/${fileName}.scss');`;

  fs.writeFile(`./src/html/${fileName}.html`, html, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Generate ${fileName}.html file ok!`);
    }
  });

  fs.writeFile(`./src/css/${fileName}.scss`, css, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Generate ${fileName}.css file ok!`);
    }
  });

  fs.writeFile(`./src/js/app/${fileName}.js`, js, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Generate ${fileName}.js file ok!`);
    }
  });
};

inquirer.prompt([{
    type: 'input',
    name: 'fileName',
    message: 'Please input page file name:',
    default: 'index'
  },
  {
    type: 'input',
    name: 'title',
    message: 'Please input page title:',
    default: 'title'
  },
  {
    type: 'list',
    name: 'platform',
    message: 'Please input which platform:',
    choices: ['web', 'mobile']
  },
]).then(answers => {
  generateFile(answers.fileName, answers.title, answers.platform);
});