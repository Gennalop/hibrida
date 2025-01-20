import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IntroPage implements OnInit {

  showIntro = true;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.showIntro = false;
      this.router.navigate(['./tabs/tab4']);
    }, 3000); // 3 segundos (ajustable)
  }
}
