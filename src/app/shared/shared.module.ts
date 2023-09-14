import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LakhconvertorPipe } from '../pipes/lakhpipe/lakhconvertor.pipe';


@NgModule({
  declarations: [
    LakhconvertorPipe
  ],
  exports:[
    LakhconvertorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
