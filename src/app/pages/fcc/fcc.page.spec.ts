import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FccPage } from './fcc.page';

describe('FccPage', () => {
  let component: FccPage;
  let fixture: ComponentFixture<FccPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
