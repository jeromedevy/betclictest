import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';


import {
  MatFormFieldModule,
  MatTableModule,
  MatListModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTabsModule,
  MatSelectModule,
  MatGridListModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatCardModule
  ]
})
export class MaterialModule { }