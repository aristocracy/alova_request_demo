import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:process.env.NODE_ENV == "development"? "/":"./",
  envPrefix: "USAGI_",
  publicDir:"public",
  build: {
		outDir: "ALOVA",
		emptyOutDir: true,
		copyPublicDir: true,
		sourcemap: false,
		assetsInlineLimit: 4096,
		reportCompressedSize: true,
		chunkSizeWarningLimit: 1024,
	},
	server: {
		host: "localhost",
		port: 5173,
		open: false,
		origin: "http://localhost:5173",
		cors: {
			origin: "http://127.0.0.1:8000",
			methods: ["OPTIONS", "HEAD", "GET", "PUT", "POST", "DELETE"],
			credentials: true,
			optionsSuccessStatus: 204,
		},
		proxy: {
			"^/api": {
				target: "http://127.0.0.1:8000",
				changeOrigin: false,
				secure: false,
				proxyTimeout: 5000,
				timeout: 5000,
				rewrite: (url) => url.replace(/^\/api/, ""),
				configure: (/*proxy, options*/) => {
					// proxy 是 'http-proxy' 的实例
				},
			},
			"/socket.io": {
				target: "ws://localhost:5174",
				ws: true,
			},
		},
		// strict: true,
		// fs: {
		// 	allow: ["."],
		// 	deny: [".env", ".env.*", "*.{pem,crt}"],
		// },
	},
	//https://cn.vitejs.dev/config/preview-options.html
	preview: {
		port: 4173,
		strictPort: true,
		open: true,
		cors: {
			origin: true,
			methods: ["HEAD", "GET", "PUT", "POST", "DELETE"],
			credentials: true,
			optionsSuccessStatus: 204,
		},
	},
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: "less", // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    postcss: "./postcss.config.ts",
    preprocessorOptions:{
      less: {
				charset: false,
				additionalData: '@import "./src/assets/styles/theme.less";',
				math: "always", // 括号内才使用数学计算
				globalVars: {
					// 全局变量
					mainColor: "red",
				},
				modifyVars: {
					"primary-color": "#1890ff",
				},
				javascriptEnabled: true,
			},
    }
  }
})
