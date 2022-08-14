import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './about/about.component'
import { ProductsComponent } from './products/products.component'
import { CategoryComponent } from './category/category.component'
import { EmployeeComponent } from './employee/employee.component'
import { ContactComponent } from './contact/contact.component'

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'contact', component: ContactComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
