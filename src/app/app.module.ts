import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ErrorHandleService } from './service/error-handle.service';
import { ApiHeaderInterceptor } from './interceptor/api-header-interceptor';
import { HomeComponent } from './components/home/home.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { StockPipe } from './pipe/stock.pipe';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    StockPipe,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    DataViewModule,
    TagModule,
    CommonModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandleService }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiHeaderInterceptor,
    multi: true
  }, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
