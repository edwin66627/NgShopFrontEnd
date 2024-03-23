import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BannerComponent,
    SliderComponent
  ],
  imports: [
    CommonModule, ButtonModule
  ],
  exports: [
    BannerComponent,
    SliderComponent
  ]
})
export class UiModule { }
