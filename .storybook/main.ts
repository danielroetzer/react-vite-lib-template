import type { StorybookConfig } from '@storybook/react-vite'

const libFolder = 'lib'

const config: StorybookConfig = {
  stories: [
    `../${libFolder}/**/*.mdx`,
    `../${libFolder}/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
export default config
