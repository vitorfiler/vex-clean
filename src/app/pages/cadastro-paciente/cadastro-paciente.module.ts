import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoDialogComponent } from './cadastro-paciente.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
import { HighlightModule } from 'src/@vex/components/highlight/highlight.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [DemoDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    HighlightModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    MatIconModule,
    IconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  entryComponents: [DemoDialogComponent]
})
export class CadastroPacienteModule { }
