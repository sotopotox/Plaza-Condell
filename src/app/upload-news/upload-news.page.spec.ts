import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadNewsPage } from './upload-news.page';

describe('UploadNewsPage', () => {
  let component: UploadNewsPage;
  let fixture: ComponentFixture<UploadNewsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
