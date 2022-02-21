import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FeedbackModalComponent } from './feedback.component';

describe('FeedbackModalComponent', () => {
  let component: FeedbackModalComponent;
  let fixture: ComponentFixture<FeedbackModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FeedbackModalComponent],
        providers: [DynamicDialogRef],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
