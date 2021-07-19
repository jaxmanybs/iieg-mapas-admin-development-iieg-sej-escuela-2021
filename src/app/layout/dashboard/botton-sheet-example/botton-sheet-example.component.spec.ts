import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonSheetExampleComponent } from './botton-sheet-example.component';

describe('BottonSheetExampleComponent', () => {
  let component: BottonSheetExampleComponent;
  let fixture: ComponentFixture<BottonSheetExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottonSheetExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottonSheetExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
