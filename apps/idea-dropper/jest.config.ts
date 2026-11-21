/* eslint-disable */
export default {
  displayName: 'idea-dropper',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  setupFiles: ['<rootDir>/src/test-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/pages/api/test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/idea-dropper',
};
