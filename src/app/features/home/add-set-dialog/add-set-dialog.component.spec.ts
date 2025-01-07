import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddCustomSetDialogComponent } from "./add-set-dialog.component";

describe("AddCustomSetDialogComponent", () => {
  let component: AddCustomSetDialogComponent;
  let fixture: ComponentFixture<AddCustomSetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCustomSetDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
