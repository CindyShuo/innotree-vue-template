function renderFiles (api, opts) {

  const fs = require('fs')

  // 通过preset的形式配置opts.router，这里则不需要
  const routerPath = api.resolve('./src/router.js')
  opts.router = opts.router || fs.existsSync(routerPath)

  const filesToDelete = [
    'src/assets/logo.png',
    'src/views/About.vue',
    'src/views/Home.vue',
  ]

  console.log('\n[custom-tpl plugin tips]\n \t GeneratorAPI options:', opts)

  if (opts.replaceTemplates) {

    // https://github.com/vuejs/vue-cli/issues/2470
    api.render(files => {
      Object.keys(files)
        .filter(name => filesToDelete.indexOf(name) > -1)
        .forEach(name => delete files[name])
    })

    api.render('./templates/base')

    // 安装 vuex
    if (options.vuex) {
      api.extendPackage({
        dependencies: {
          vuex: '^latest'
        }
      });

      api.render('./template/vuex');
    }

    // 安装 element-ui 库
    if (options.elementUI) {
      api.extendPackage({
        devDependencies: {
          "element-ui": "^latest"
        }
      });
    }

    if (opts.router) {
      // 替换掉路由文件
      api.render('./templates/sp')
    }else{
    }

  }
}

function addDependencies (api) {
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
    },
    devDependencies: {}
  })
}

module.exports = (api, opts, rootOpts) => {
  addDependencies(api)
  renderFiles(api, opts)
}
