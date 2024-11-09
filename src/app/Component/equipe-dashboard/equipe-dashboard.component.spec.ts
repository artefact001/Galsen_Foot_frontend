import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeDashboardComponent } from './equipe-dashboard.component';

describe('EquipeDashboardComponent', () => {
  let component: EquipeDashboardComponent;
  let fixture: ComponentFixture<EquipeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
