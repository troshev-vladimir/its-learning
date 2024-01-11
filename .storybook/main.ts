import type { StorybookConfig } from '@storybook/vue3-vite'

const path = require('path')

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: '@',
            replacement: path.resolve(__dirname, './src'),
          },
          {
            find: '~',
            replacement: path.resolve(__dirname, './src'),
          },
          {
            find: '@assets',
            replacement: path.resolve(__dirname, './src/assets'),
          },
          {
            find: '@components',
            replacement: path.resolve(__dirname, './src/components'),
          },
        ],
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(
          configType === 'DEVELOPMENT' ? 'development' : 'production'
        ),
        'process.env.REACT_APP_ENV': JSON.stringify(
          configType === 'DEVELOPMENT' ? 'development' : 'production'
        ),
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @import '@fortawesome/fontawesome-svg-core/styles.css';
              @import './assets/styles/variables.scss';
              @import './assets/styles/reset-styles.scss';
              @import './assets/styles/fonts.scss';
          `,
          },
        },
      },
    }
  },
}
export default config
