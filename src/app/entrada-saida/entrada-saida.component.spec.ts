import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaSaidaComponent } from './entrada-saida.component';

describe('EntradaSaidaComponent', () => {
  let component: EntradaSaidaComponent;
  let fixture: ComponentFixture<EntradaSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
