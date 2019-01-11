import { NgModule } from '@angular/core';

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
    MatCardModule
  ]
})
export class MaterialModule { }