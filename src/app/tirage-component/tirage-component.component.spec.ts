import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TirageComponentComponent } from './tirage-component.component';

describe('TirageComponentComponent', () => {
  let component: TirageComponentComponent;
  let fixture: ComponentFixture<TirageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TirageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TirageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
