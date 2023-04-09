import { TestBed } from '@angular/core/testing';

import { NewAzureAccessTokenInterceptor } from './new-azure-access-token.interceptor';

describe('NewAzureAccessTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NewAzureAccessTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NewAzureAccessTokenInterceptor = TestBed.inject(NewAzureAccessTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
