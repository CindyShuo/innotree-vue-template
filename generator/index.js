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
    if (opts.vuex) {
      api.extendPackage({
        dependencies: {
          vuex: '^3.0.1'
        }
      });

      api.render('./template/vuex');
    }

    // 安装 element-ui 库
    if (opts.elementUI) {
      api.extendPackage({
        devDependencies: {
          "element-ui": "^2.7.2",
          "vue-cli-plugin-element": "^1.0.0",
          "babel-plugin-component": "^1.1.1"
        }
      });
      api.render('./templates/el')
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
      "babel-polyfill": "^6.26.0",
    },
    devDependencies: {
      "qs": "^6.5.2",
      "style-resources-loader": "^1.2.1",
    }
  })
}

module.exports = (api, opts, rootOpts) => {
  addDependencies(api)
  renderFiles(api, opts)
}
