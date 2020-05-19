export default {
  extraBabelPlugins: [
    ["import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: false
    }]
  ],
  disableCSSModules: false,

  proxy: {

    "/api": {

      target: "https://xxx.xxxxxxxxxxxx.com/", //接口域名

      // secure: false,// 如果是https接口，需要配置这个参数

      changeOrigin: true, //如果接口进行跨域，需要这个来参数配置

      //                pathRewrite:  { "^/yangApi" : " " }      //如果接口本身没有/api需要pathRewrite来重写地址。意思就是如果不写这个，我匹配到了/yangApi接口，但是没换路径，最后还是yangApi得接口，应该是匹配到了/yangApi，走代理，然后把/yangApi变成""   

    }

  }
}
