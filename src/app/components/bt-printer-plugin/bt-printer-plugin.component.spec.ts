import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtPrinterPluginComponent } from './bt-printer-plugin.component';

describe('BtPrinterPluginComponent', () => {
  let component: BtPrinterPluginComponent;
  let fixture: ComponentFixture<BtPrinterPluginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtPrinterPluginComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtPrinterPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
