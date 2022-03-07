import { enableSPS, ScullyConfig } from '@scullyio/scully';

enableSPS();

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'angular-starter',
  spsModulePath: './src/app/app.sps.module.ts',
  outDir: './dist/static',
  routes: {},
};
