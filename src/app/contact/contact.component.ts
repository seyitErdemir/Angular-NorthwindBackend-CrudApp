import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  data: any = ''
  messages: any = []
  filterMessages = this.messages
  lang = localStorage.getItem('language')
  locale = {
    name: '',
    email: '',
    phone: '',
    message: '',
    search: '',
    notMessage: '',
    add: '',
    addTrueMessage:"",
     falseMessage:""
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
      .get<any>('http://localhost:3030/api/contact-us')
      .subscribe((data) => {
        this.messages = data.reverse()
        this.filterMessages = this.messages
      })


      if (this.lang == 'en') {
        this.locale = {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          message: 'Message',
          search: 'Search',
          notMessage: 'Message Not Found!',
          add: 'Add Message',
          addTrueMessage:"Message Adding Successful You Are Redirected",
          falseMessage:"Failed Attach Attempt"
  
        }
      }else{
        this.locale = {
          name: 'Ad',
          email: 'Email',
          phone: 'Telefon',
          message: 'Mesaj',
          search: 'Arama',
          notMessage: 'Mesaj Bulunamadı!', 
          add: 'Mesaj Ekle',
          addTrueMessage:"Message Ekleme İşlemi Başarılı Yönlendiriliyorsunuz",
          falseMessage:"Başarısız Ekleme Denemesi"

        }
      }



  }

  changeView(id: any) {
    console.log(id)
    localStorage.setItem('view', id)

    // location.replace('/products')
    this.ngOnInit()
  }

  onAddMessageSubmit(addMessageForm: NgForm) {
    const body = addMessageForm.value

    this.http
      .post<string>('http://localhost:3030/api/contact-us', body)
      .subscribe({
        next: (data) => {
          console.log(data)

          this.toastr.success(
            this.locale.addTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )

          setTimeout(() => {
            location.replace('/contact')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  filterText = ''
  onInputChange() {
    console.log(this.filterText)
    this.filterMessages = this.filterText
      ? this.messages.filter((m: { name: string }) =>
          m.name.toLocaleLowerCase().includes(this.filterText),
        )
      : this.messages
  }



  
}
