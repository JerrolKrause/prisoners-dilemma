import { App } from './app.po';

describe('Application', () => {
  let app: App = new App();

  beforeEach(() => {
    app.navigateTo();
  });
});
