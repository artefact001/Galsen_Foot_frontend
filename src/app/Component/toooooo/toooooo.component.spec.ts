import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooooooComponent } from './toooooo.component';

describe('TooooooComponent', () => {
  let component: TooooooComponent;
  let fixture: ComponentFixture<TooooooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooooooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooooooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
