import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

import { NavbarComponent } from '../navbar/navbar.component'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  data: any = ''

  employees: any = []
  filterEmployees = this.employees

  lang = localStorage.getItem('language')
  locale = {
    firstName: '',
    lastName: '',
    title: '',
    country: '',
    city: '',
    birthDate: '',
    notEmployee: '',
    add: '',
    update: '',
    delete: '',
    info: '',
    search: '',
    close: '',
    addEmployeeTrueMessage:"",
    updateEmployeeTrueMessage:"",
    deleteEmployeeTrueMessage:"",
    deleteEmployeeCloseMessage:"",
    deleteEmployeeConfirmMessage:"",
    employeeFalseMessage:""
  }

  ngOnInit(): void {
   
    if (!localStorage.getItem('view')) {
      localStorage.setItem('view', '3')
    }
    this.data = localStorage.getItem('view')

    if (!localStorage.getItem('token')) {
      this.toastr.warning('Giriş yetkiniz yok', 'Toastr!', { timeOut: 2000 })
      location.replace('/')
    }

    this.http
      .get<any>('http://localhost:3030/api/employees')
      .subscribe((data) => {
        this.employees = data.reverse()
        this.filterEmployees = this.employees
      })

    if (this.lang == 'en') {
      this.locale = {
        firstName: 'First Name',
        lastName: 'Last Name',
        title: 'Title',
        country: 'Country',
        city: 'City',
        birthDate: 'Birth Date',
        notEmployee: 'Employee Not Found!',
        add: 'Add Employee',
        update: 'Update',
        delete: 'Delete',
        info: 'İnfo',
        search: 'Search',
        close: 'Close',
        addEmployeeTrueMessage:"Adding Employees Successfully You Are Redirected",
        updateEmployeeTrueMessage:"Employee Update Successfully You Are Redirected",
        deleteEmployeeTrueMessage:"Employee Deletion Successfully You Are Redirected",
        deleteEmployeeCloseMessage:"Delete Attempt Canceled",
        deleteEmployeeConfirmMessage:"Are you sure you want to delete?",
        employeeFalseMessage:"Failed Attempt You Are Redirected"
      }
    } else {
      this.locale = {
        firstName: 'İsim',
        lastName: 'Soyisim',
        title: 'Ünvan',
        country: 'Ülke',
        city: 'Şehir',
        birthDate: 'Doğum Tarihi',
        notEmployee: 'Çalışan Bulunamadı!',
        add: 'Çalışan Ekle',
        update: 'Güncelle',
        delete: 'Sil',
        info: 'Detay',
        search: 'Arama',
        close: 'İptal',
        addEmployeeTrueMessage:"Employee Ekleme İşlemi Başarılı Yönlendiriliyorsunuz",
        updateEmployeeTrueMessage:"Employee Güncelleme İşlemi Başarılı Yönlendiriliyorsunuz",
        deleteEmployeeTrueMessage:"Employee Silme İşlemi Başarılı Yönlendiriliyorsunuz",
        deleteEmployeeCloseMessage:"Silme Denemesi İptal Edildi",
        deleteEmployeeConfirmMessage:"Silmek istediğine emin misin?",
        employeeFalseMessage:"Başarısız Deneme Yönlendiriliyorsunuz"
      }
    }
  }

  changeView(id: any) {
    console.log(id)
    localStorage.setItem('view', id)

    // location.replace('/products')
    this.ngOnInit()
  }

  onAddEmployeeSubmit(addEmployeeForm: NgForm) {
    const imageName = Math.floor(Math.random() * 9) + '.jpg'
    const body = addEmployeeForm.value
    body.imageName = imageName

    this.http
      .post<string>('http://localhost:3030/api/employees', body)
      .subscribe({
        next: (data) => {
          console.log(data)

          this.toastr.success(
            this.locale.addEmployeeTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )

          setTimeout(() => {
            location.replace('/employees')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.employeeFalseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  onUpdateEmployeeSubmit(updateEmployeeForm: NgForm) {
    const body = updateEmployeeForm.value

    this.http
      .put<number>('http://localhost:3030/api/employees' + '/' + body.id, body)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.toastr.success(
            this.locale.updateEmployeeTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )
          setTimeout(() => {
            location.replace('/employees')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.employeeFalseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  employeeDelete(id: any) {
    if (confirm(this.locale.deleteEmployeeConfirmMessage)) {
      this.http
        .delete<number>('http://localhost:3030/api/employees' + '/' + id)
        .subscribe({
          next: (data) => {
            console.log(data)
            this.toastr.success(
              this.locale.deleteEmployeeTrueMessage,
              'Toastr!',
              { timeOut: 2000 },
            )

            setTimeout(() => {
              location.replace('/employees')
            }, 1000)
          },
          error: (error) => {
            this.toastr.error(this.locale.employeeFalseMessage, 'Toastr fun!', {
              timeOut: 2000,
            })
          },
        })
    } else {
      this.toastr.error(this.locale.deleteEmployeeCloseMessage, 'Toastr fun!', {
        timeOut: 2000,
      })
    }
  }

  filterText = ''
  onInputChange() {
    console.log(this.filterText)
    this.filterEmployees = this.filterText
      ? this.employees.filter((m: { firstName: string }) =>
          m.firstName.toLocaleLowerCase().includes(this.filterText),
        )
      : this.employees
  }
}
