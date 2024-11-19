import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Too11Component } from './too11.component';

describe('Too11Component', () => {
  let component: Too11Component;
  let fixture: ComponentFixture<Too11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Too11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Too11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
