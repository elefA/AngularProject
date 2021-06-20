import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpattrComponent } from './add-empattr.component';

describe('AddEmpattrComponent', () => {
  let component: AddEmpattrComponent;
  let fixture: ComponentFixture<AddEmpattrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmpattrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
