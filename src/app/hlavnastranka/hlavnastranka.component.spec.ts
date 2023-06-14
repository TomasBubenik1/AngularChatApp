import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HlavnastrankaComponent } from './hlavnastranka.component';

describe('HlavnastrankaComponent', () => {
  let component: HlavnastrankaComponent;
  let fixture: ComponentFixture<HlavnastrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HlavnastrankaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HlavnastrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
