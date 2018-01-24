import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingComponent } from './greeting.component';

describe('GreetingComponent', () => {
  let component: GreetingComponent;
  let fixture: ComponentFixture<GreetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clicked should be true after the component is clicked', () => {
    component.onClick();
    expect(component.clicked).toBeTruthy();
  })

  it('total clicks shoudl be 0 at the beginning', () => {
    expect(component.totalClicks).toBe(0);
  })

  it('total clicks should be 1 after 1 click', () => {
    component.onClick();
    expect(component.totalClicks).toBe(1);
  })

  it('total clicks should be 3 after 3 clicks', () => {
    component.onClick();
    component.onClick();
    component.onClick();
    expect(component.totalClicks).toBe(3);
  })
});
