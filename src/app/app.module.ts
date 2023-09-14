import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ExcelService } from './services/excel.service';
import { SocketIoModule } from 'ngx-socket-io';
import { config } from './socketio/socket-io.config';
import { CommonLoaderComponent } from './common-loader/common-loader.component';




@NgModule({
  declarations: [
    AppComponent,
    CommonLoaderComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    SocketIoModule.forRoot({ url: 'https://eliteshopie.online' }),
    ToastrModule.forRoot(),
  ],
  providers: [
    ExcelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
