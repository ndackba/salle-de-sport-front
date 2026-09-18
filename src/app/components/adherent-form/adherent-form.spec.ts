import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdherentForm } from './adherent-form';

describe('AdherentForm', () => {
  let component: AdherentForm;
  let fixture: ComponentFixture<AdherentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdherentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdherentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
