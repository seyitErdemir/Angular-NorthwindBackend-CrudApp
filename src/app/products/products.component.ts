import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  data: any = ''

  products: any = []
  filterProducts = this.products

  lang = localStorage.getItem('language')
  locale = {
    name: '',
    price: '',
    stock: '',
    notProduct: '',
    add: '',
    update: '',
    delete: '',
    info: '',
    search: '',
    close: '',
    addTrueMessage: '',
    updateTrueMessage: '',
    deleteTrueMessage: '',
    deleteCloseMessage: '',
    deleteConfirmMessage: '',
    falseMessage: '',
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
      .get<any>('http://localhost:3030/api/products')
      .subscribe((data) => {
        this.products = data.reverse()
        this.filterProducts = this.products
      })


      if (this.lang == 'en') {
        this.locale = {
          name: 'Name',
          price: 'Price',
          stock: 'Stock', 
          notProduct: 'Product Not Found!',
          add: 'Add Product',
          update: 'Update',
          delete: 'Delete',
          info: 'İnfo',
          search: 'Search',
          close: 'Close',
          addTrueMessage:"Adding Product Successfully You Are Redirected",
          updateTrueMessage:"Product Update Successfully You Are Redirected",
          deleteTrueMessage:"Product Deletion Successfully You Are Redirected",
          deleteCloseMessage:"Delete Attempt Canceled",
          deleteConfirmMessage:"Are you sure you want to delete?",
          falseMessage:"Failed Attempt You Are Redirected"
          
        }
      } else {
        this.locale = {
          name: 'Ürün Adı',
          price: 'Fiyat',
          stock: 'Stok',  
          notProduct: 'Ürün Bulunamadı!', 
          add: 'Ürün Ekle',
          update: 'Güncelle',
          delete: 'Sil',
          info: 'Detay',
          search: 'Arama',
          close: 'İptal',
          addTrueMessage:"Ürün Ekleme İşlemi Başarılı Yönlendiriliyorsunuz",
          updateTrueMessage:"Ürün Güncelleme İşlemi Başarılı Yönlendiriliyorsunuz",
          deleteTrueMessage:"Ürün Silme İşlemi Başarılı Yönlendiriliyorsunuz",
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

  onAddProductSubmit(addProductForm: NgForm) {
    const imageName = Math.floor(Math.random() * 77) + '.jpg'
    const body = addProductForm.value
    body.imageName = imageName

    this.http
      .post<string>('http://localhost:3030/api/products', body)
      .subscribe({
        next: (data) => {
          console.log(data)

          this.toastr.success(
            this.locale.addTrueMessage,
            'Toastr!',
            { timeOut: 2000 },
          )

          setTimeout(() => {
            this.ngOnInit()
            // location.replace('/products')
          }, 1000)
        },
        error: (error) => {
          this.toastr.error(this.locale.falseMessage, 'Toastr fun!', {
            timeOut: 2000,
          })
        },
      })
  }

  productDelete(id: any) {
    if (confirm(this.locale.deleteConfirmMessage)) {
      this.http
        .delete<number>('http://localhost:3030/api/products' + '/' + id)
        .subscribe({
          next: (data) => {
            console.log(data)
            this.toastr.success(
              this.locale.deleteTrueMessage,
              'Toastr!',
              { timeOut: 2000 },
            )

            setTimeout(() => {
              this.ngOnInit()
              // location.replace('/products')
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

  onUpdateProductSubmit(updateProductForm: NgForm) {
    const body = updateProductForm.value

    this.http
      .put<number>('http://localhost:3030/api/products' + '/' + body.id, body)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.toastr.success(
            this.locale.updateTrueMessage,
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

  filterText = ''
  onInputChange() {
    console.log(this.filterText)
    this.filterProducts = this.filterText
      ? this.products.filter((m: { name: string }) =>
          m.name.toLocaleLowerCase().includes(this.filterText.toLocaleLowerCase()),
        )
      : this.products
  }
}
