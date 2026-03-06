import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryButtons } from './category-buttons';

describe('CategoryButtons', () => {
  let component: CategoryButtons;
  let fixture: ComponentFixture<CategoryButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
