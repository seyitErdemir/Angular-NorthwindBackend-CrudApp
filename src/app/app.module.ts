import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { AboutComponent } from './about/about.component'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component'
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ContactComponent } from './contact/contact.component'

@NgModule({
  declarations: [AppComponent, NavbarComponent, AboutComponent, ProductsComponent, FooterComponent, CategoryComponent, EmployeeComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,     
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
