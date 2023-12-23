import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.github.trilinder.tapasclient',
  appName: 'TapasClient',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
