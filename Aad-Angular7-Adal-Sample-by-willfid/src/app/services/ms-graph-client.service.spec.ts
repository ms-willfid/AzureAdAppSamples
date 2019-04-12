import { TestBed } from '@angular/core/testing';

import { MsGraphClientService } from './ms-graph-client.service';

describe('MsGraphClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsGraphClientService = TestBed.get(MsGraphClientService);
    expect(service).toBeTruthy();
  });
});
