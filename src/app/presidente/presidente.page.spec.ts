import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresidentePage } from './presidente.page';

describe('PresidentePage', () => {
  let component: PresidentePage;
  let fixture: ComponentFixture<PresidentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
