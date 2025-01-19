import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardTitle, IonCardContent, IonCardHeader, IonButton, IonGrid, IonRow, IonCol, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardContent, IonCardHeader, IonButton, IonGrid, IonRow, IonCol, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class Tab5Page implements OnInit {

  private jsonUrl = 'assets/collectionInfo.json';
  collectionId: string | null = null;
  collectionInfo: any = null;
  public insectoInfo: any = null;

  collectionName = 'info insectos';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private providerService: ProviderService) { }

  ngOnInit() {
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<any[]>(this.jsonUrl).subscribe(data => {
      this.collectionInfo = data.find(collection => collection.id.toString() === this.collectionId);
    })
    this.providerService.getInsectoById(this.collectionId as string, this.collectionName).subscribe((data) => {
      this.insectoInfo = data;
    });
  }

  public getInsectoInf() {
    return this.insectoInfo;
  }

}
