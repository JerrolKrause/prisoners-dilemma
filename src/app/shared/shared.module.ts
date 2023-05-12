import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes, Angular
import { DatePipe, CurrencyPipe } from '@angular/common';
// Pipes, Custom
import {
  CountPipe,
  DebouncePipe,
  PhoneNumberPipe,
  DurationPipe,
  FilterPipe,
  HtmlRemovePipe,
  SafeHtmlPipe,
  SlugPipe,
  SortPipe,
  StringPipe,
  TextCasePipe,
  LimitPipe,
} from './pipes';
// Directives
import { FullScreenDirective, FocusDirective } from './directives';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// Pipes + Directives
export const APP_PIPES_DIRECTIVES = [
  // Pipes
  CountPipe,
  DebouncePipe,
  PhoneNumberPipe,
  DurationPipe,
  FilterPipe,
  HtmlRemovePipe,
  SafeHtmlPipe,
  SlugPipe,
  SortPipe,
  StringPipe,
  TextCasePipe,
  LimitPipe,

  // Directives
  FullScreenDirective,
  FocusDirective,
];

const MODULES = [
  // Angular
  RouterModule,
  ConfirmDialogModule,
  DynamicDialogModule,
];

@NgModule({
  imports: [CommonModule, MODULES],
  providers: [DatePipe, CurrencyPipe],
  declarations: [APP_PIPES_DIRECTIVES],
  exports: [APP_PIPES_DIRECTIVES, MODULES],
})
export class SharedModule {}
