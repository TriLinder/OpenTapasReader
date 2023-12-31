import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.trilinder.tapasclient',
  appName: 'OpenTapasReader',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
