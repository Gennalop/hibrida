import { ViewChild, ElementRef, Component, signal } from '@angular/core';
import { IonCardContent, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
/* Importe la función y el ícono */
import { addIcons } from 'ionicons';
import { cloudUploadOutline, camera } from 'ionicons/icons';
/* Importe el pipe */
import { PercentPipe } from '@angular/common';
/* Importe el servicio */
import { TeachablemachineService } from '../../services/teachablemachine.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CollectionService } from '../../services/collection.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, PercentPipe, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  /* Declare la referencia al elemento con el id image */
  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;
  imageReady = signal(false)
  imageUrl = signal("")
  /* Declare los atributos para almacenar el modelo y la lista de clases */
  modelLoaded = signal(false);
  classLabels: string[] = [];
  constructor(private teachablemachine: TeachablemachineService, private collectionService: CollectionService, private http: HttpClient) {
    /* Registre el ícono */
    addIcons({ cloudUploadOutline, camera });
  }
  /* El método onSubmit para enviar los datos del formulario mediante el servicio */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      // Convertir el archivo a una URL base64 para mostrarlo en el html
      reader.onload = () => {
        this.imageUrl.set(reader.result as string)
        this.imageReady.set(true)
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  }

  collections: any[] = [];
  private jsonUrl = 'assets/collectionInfo.json';
  /* Método ngOnInit para cargar el modelo y las clases */
  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
    this.http.get<any[]>(this.jsonUrl).subscribe(data => {
      this.collections = data;
    })

  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      const capturedImage = image.dataUrl;
      this.imageUrl.set(capturedImage as string);
      this.imageReady.set(true);
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  /* Lista de predicciones */
  predictions: any[] = [];

  highestPrediction: any = null;
  /* Método para obtener la predicción a partir de la imagen */
  async predict() {
    try {
      const image = this.imageElement.nativeElement;
      this.predictions = await this.teachablemachine.predict(image);

      this.highestPrediction = this.predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      console.log('Highest Prediction:', this.highestPrediction);

    } catch (error) {
      console.error(error);
      alert('Error al realizar la predicción.');
    }
  }

}
