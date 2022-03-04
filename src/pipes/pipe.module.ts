import { NgModule } from '@angular/core';
import { FilterPipe } from './search.pipe';



@NgModule({
  declarations: [
    FilterPipe
  ],
  exports: [
    FilterPipe
  ],
  imports: []
})
export class PipeModule { }
