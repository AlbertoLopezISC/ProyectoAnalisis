import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginvendedoraComponent } from './loginvendedora.component';

describe('LoginvendedoraComponent', () => {
  let component: LoginvendedoraComponent;
  let fixture: ComponentFixture<LoginvendedoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginvendedoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginvendedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
