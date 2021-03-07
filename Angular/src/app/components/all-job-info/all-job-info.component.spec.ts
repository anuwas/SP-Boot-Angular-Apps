import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobInfoComponent } from './all-job-info.component';

describe('AllJobInfoComponent', () => {
  let component: AllJobInfoComponent;
  let fixture: ComponentFixture<AllJobInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllJobInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
