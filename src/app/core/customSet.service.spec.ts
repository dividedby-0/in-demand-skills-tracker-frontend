import { TestBed } from "@angular/core/testing";

import { CustomSetService } from "./customSet.service";

describe("CustomSetsService", () => {
  let service: CustomSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
