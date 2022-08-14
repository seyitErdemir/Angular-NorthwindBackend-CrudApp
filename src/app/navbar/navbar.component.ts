import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  locale = {
    home: '',
    products: '',
    categories: '',
    employees: '',
    contact: '',
    login: '',
    register: '',
    logout: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    add: '',
    loginTrueMessage: '',
    registerTrueMessage: '',
    falseMessage: '',
  }

  lang = localStorage.getItem('language')
  loginCheck = localStorage.getItem('loginCheck')

  ngOnInit(): void {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'tr')
    }

    if (this.lang == 'en') {
      this.locale = {
        home: 'Home',
        products: 'Products',
        categories: 'Categories',
        employees: 'Employees',
        contact: 'Contact-Us',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        firstName: 'First Name',
        lastName: 'Last Name',
        username: 'User Name',
        password: 'Password',
        add: 'Save',
        loginTrueMessage: 'Login Successfully Redirected',
        registerTrueMessage: 'Registration Successful You Are Redirected',
        falseMessage: 'Failed Request Attempt',
      }
    } else {
      this.locale = {
        home: 'Anasayfa',
        products: 'Ürünler',
        categories: 'Kategoriler',
        employees: 'Kullanıcılar',
        contact: 'İletişim',
        login: 'Giriş',
        register: 'Kayıt Ol',
        logout: 'Çıkış',
        firstName: 'Adınız',
        lastName: 'Soyadınız',
        username: 'Kullanıcı Adı',
        password: 'Şifre',
        add: 'Ekle',
        loginTrueMessage: 'Giriş Başarılı Yönlendiriliyorsunuz',
        registerTrueMessage: 'Registration Successful You Are Redirected',
        falseMessage: 'Başarısız İstek Denemesi',
      }
    }
  }

  setLanguage(lang: any) {
    localStorage.setItem('language', lang)
    location.reload()
  }

  onSubmit(myForm: NgForm) {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar',
    }
    const body = myForm.value
    this.http
      .post<any>('http://localhost:3030/api/auth/login', body, { headers })
      .subscribe({
        next: (data) => {
          console.log(data)
          localStorage.setItem('token', data)
          localStorage.setItem('loginCheck', 'true')

          this.toastr.success(
            this.locale.loginTrueMessage,
            'Toastr fun!',
            { timeOut: 1000 },
          )

          setTimeout(() => {
            location.replace('/products')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  onRegisterSubmit(myRegisterForm: NgForm) {
    const body = myRegisterForm.value
    this.http
      .post<string>('http://localhost:3030/api/auth/register', body)
      .subscribe({
        next: (data) => {
          console.log(data)
          localStorage.setItem('token', data)
          localStorage.setItem('loginCheck', 'true')

          this.toastr.success(
            this.locale.registerTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )

          setTimeout(() => {
            location.replace('/products')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('loginCheck')
    this.toastr.success('Çıkış İşlemi Başarılı ', 'Toastr!', {
      timeOut: 1000,
    })
    setTimeout(() => {
      location.replace('/')
    }, 1000)
  }
}
