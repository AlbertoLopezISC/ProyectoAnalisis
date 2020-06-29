import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoraComponent } from './directora.component';

describe('DirectoraComponent', () => {
  let component: DirectoraComponent;
  let fixture: ComponentFixture<DirectoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
