import { SystemIntegratorERPPage } from './app.po';

describe('system-integrator-erp App', function() {
  let page: SystemIntegratorERPPage;

  beforeEach(() => {
    page = new SystemIntegratorERPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
