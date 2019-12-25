const baseConfig = {
  appName: 'xxxx',
  ENV: ENV,
  CDN_BASE: CDN_BASE,
  BACKEND_BASE: BACKEND_BASE
}

// 可以根据不同环境添加不同配置
const envConfig = {
  loc: {
    mock: true,
  },
  dev: {
    mock: false
  },
  prod: {
    mock: false,
  }
}

// 合并配置
const config = Object.assign(baseConfig, envConfig[baseConfig.ENV]);

const getApi = function(url, app = '') {
  const isMock = config.mock;
  if (!url) return false
  if (url.indexOf('http') >= 0 && isMock) {
    return url
  }
 
  if (isMock) {
    return '/assets/mock/' + url.replace(/\//g, '-') + '.json'
    // 关闭了mock，则返回真实接口地址
  } else {
    // 获取api版本
    return `${config.BACKEND_BASE}/${url}`
  }
}

config.getApi = getApi;

export default config