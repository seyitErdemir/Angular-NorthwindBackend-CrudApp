import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms'
 

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  categories: any = []
  data: any = ''

  filterCategories :any= []

  lang = localStorage.getItem('language')
  locale = {
    name: '',
    description: '',
    notCategory: '',
    add: '',
    update: '',
    delete: '',
    info: '',
    search: '',
    close: '',
    addTrueMessage:"",
    updateTrueMessage:"",
    deleteTrueMessage:"",
    deleteCloseMessage:"",
    deleteConfirmMessage:"",
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

    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    })

    const requestOptions = { headers: headers }

    this.http
      .get('http://localhost:3030/api/categories', requestOptions)
      .subscribe((res: any) => {
        console.log(res) 
        this.categories = res.reverse()
        this.filterCategories = this.categories
      })

      if (this.lang == 'en') {
        this.locale = {
          name: 'Name',
          description: 'Description',
          notCategory: 'Category Not Found!',
          add: 'Add Category',
          update: 'Update',
          delete: 'Delete',
          info: 'İnfo',
          search: 'Search',
          close: 'Close',
          addTrueMessage:"Adding Category Successfully You Are Redirected",
          updateTrueMessage:"Category Update Successfully You Are Redirected",
          deleteTrueMessage:"Category Deletion Successfully You Are Redirected",
          deleteCloseMessage:"Delete Attempt Canceled",
          deleteConfirmMessage:"Are you sure you want to delete?",
          falseMessage:"Failed Attempt You Are Redirected"
          
        }
      } else {
        this.locale = {
          name: 'Kategori Adı',
          description: 'Açıklama',
          notCategory: 'Kategori Bulunamadı!', 
          add: 'Çalışan Ekle',
          update: 'Güncelle',
          delete: 'Sil',
          info: 'Detay',
          search: 'Arama',
          close: 'İptal',
          addTrueMessage:"Kategori Ekleme İşlemi Başarılı Yönlendiriliyorsunuz",
          updateTrueMessage:"Kategori Güncelleme İşlemi Başarılı Yönlendiriliyorsunuz",
          deleteTrueMessage:"Kategori Silme İşlemi Başarılı Yönlendiriliyorsunuz",
          deleteCloseMessage:"Silme Denemesi İptal Edildi",
          deleteConfirmMessage:"Silmek istediğine emin misin?",
          falseMessage:"Başarısız Deneme Yönlendiriliyorsunuz"
 
        }
      }


  }

  changeView(id: any) {
    console.log(id)
    localStorage.setItem('view', id)

    // location.replace('/products')
    this.ngOnInit()
  }


  onAddCategorySubmit(addProductForm: NgForm) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    })
    const requestOptions = { headers: headers }

    const imageName = Math.floor(Math.random() * 8) + '.jpg'
    const body = addProductForm.value
    body.imageName = imageName

    this.http
      .post<string>('http://localhost:3030/api/categories', body , requestOptions)
      .subscribe({
        next: (data) => {
          console.log(data)

          this.toastr.success(
            this.locale.addTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )

          setTimeout(() => {
            location.replace('/categories')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }


  onUpdateCategorySubmit(updateCategoryForm: NgForm) {

    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    })
    const requestOptions = { headers: headers }

    const body = updateCategoryForm.value


    console.log(body);
    
    this.http
      .put<number>('http://localhost:3030/api/categories' + '/' + body.id, body , requestOptions)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.toastr.success(
            this.locale.updateTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )
          setTimeout(() => {
            location.replace('/categories')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }


  categoryDelete(id: any) {
    let auth_token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    })

    const requestOptions = { headers: headers }

    if (confirm(this.locale.deleteConfirmMessage)) {
      this.http
        .delete<number>(
          'http://localhost:3030/api/categories' + '/' + id,
          requestOptions,
        )
        .subscribe({
          next: (data) => {
            console.log(data)
            this.toastr.success(
              this.locale.deleteTrueMessage,
              'Toastr!',
              { timeOut: 2000 },
            )

            setTimeout(() => {
              location.replace('/categories')
            }, 1000)
          },
          error: (error) => {
            this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
              timeOut: 2000,
            })
          },
        })
    } else {
      this.toastr.error(this.locale.deleteCloseMessage, 'Toastr fun!', {
        timeOut: 2000,
      })
    }
  }



  filterText = ''
  onInputChange() {
    console.log(this.filterText)
    this.filterCategories = this.filterText
      ? this.categories.filter((m: { name: string }) =>
          m.name.toLocaleLowerCase().includes(this.filterText),
        )
      : this.categories
  }
}
