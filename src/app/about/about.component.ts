import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  locale = {
    about: '',

    
  }

  lang = localStorage.getItem('language')
  ngOnInit(): void {
    if (this.lang == 'en') {
      this.locale = {
        about:
          'I graduated from Firat University Computer Engineering. I am currently working on the Backend side with Laravel and Codeigniter, which are Php Frameworks. I have enough knowledge of Fronten to be necessary in my field of work. I share my work on GitHub and on my website with its links. I am trying to research and learn JavaScript and Frameworks due to its intense influence on Frontend and Backend areas. I follow current technologies and try to stay up to date.',
        
      
        }
    } else {
      this.locale = {
        about: 'Fırat Üniversitesi Bilgisayar Mühendisliği mezunuyum. Şu anda Php Frameworklerinden olan Laravel ve Codeigniter ile Backend tarafında çalışmaktayım. Çalışma alanımda gerekli olacak kadar Frontende hakimim . Çalışmalarımı GitHub da ve Linkleri ile birlikte Web sitemde paylaşıyorum. Frontend ve Backend alanlarında yoğun etkisinden ötürü JavaScript ve Frameworklerini araştırıp ögrenmeye çalışmaktayım. Güncel teknolojileri takip etmekte ve güncel kalmaya çalışmaktayım.',
       
      }
    }
  }
}
