import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import {  DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonicModule, Platform } from '@ionic/angular'; // ✅ Correct Import
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  imports: [IonicModule, FormsModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  providers: [Camera, File, SocialSharing]
})
export class CameraComponent {
  // // capturedImage: string | undefined;
  // savedFileUri: string | undefined;
  // capturedImage: string = ''; // ✅ Default empty string

  // constructor(
  //   private camera: Camera,
  //   private file: File,
  //   private socialSharing: SocialSharing,
  //   private platform: Platform,
  //   private sanitizer: DomSanitizer
  // ) {}

  // async takePicture() {
  //   try {
  //     const options: CameraOptions = {
  //       quality: 90,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //       sourceType: this.camera.PictureSourceType.CAMERA,
  //       saveToPhotoAlbum: true
  //     };

  //     const imageData = await this.camera.getPicture(options);
  //     this.capturedImage = imageData;
  //     console.log('Captured Image URI:', this.capturedImage);

  //     // Save the image to the device storage
  //     this.savedFileUri = await this.saveImageToDeviceStorage(imageData);
  //     console.log('Image saved at:', this.savedFileUri);
  //   } catch (error) {
  //     console.error('Error capturing image:', error);
  //   }
  // }

  // async selectFromGallery() {
  //   try {
  //     const options: CameraOptions = {
  //       quality: 90,
  //       destinationType: this.camera.DestinationType.FILE_URI,
  //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //     };

  //     const imageData = await this.camera.getPicture(options);
  //     this.capturedImage = imageData;
  //     console.log('Selected Image URI:', this.capturedImage);
  //   } catch (error) {
  //     console.error('Error selecting image:', error);
  //   }
  // }

  // async saveImageToDeviceStorage(fileUri: string): Promise<string> {
  //   try {
  //     const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
  //     const filePath = fileUri.substring(0, fileUri.lastIndexOf('/') + 1);

  //     const newFileName = `image_${new Date().getTime()}.jpg`;
  //     const newFilePath = this.file.dataDirectory;

  //     const entry = await this.file.copyFile(filePath, fileName, newFilePath, newFileName);
  //     console.log('File saved at:', entry.nativeURL);
  //     return entry.nativeURL;
  //   } catch (error) {
  //     console.error('Error saving image:', error);
  //     return '';
  //   }
  // }

  // sanitizeImage(imagePath: string): SafeUrl {
  //   return this.sanitizer.bypassSecurityTrustUrl(imagePath);
  // }

  // async shareImage() {
  //   try {
  //     if (!this.savedFileUri) {
  //       console.error('No image available to share.');
  //       return;
  //     }

  //     await this.socialSharing.share('Check out this image!', 'My Image', this.savedFileUri);
  //     console.log('Image shared successfully.');
  //   } catch (error) {
  //     console.error('Error sharing image:', error);
  //   }
  // }

  // capImage: string | null = null;  // Simplified type to just string | null
  // selectedImage: string | null = null;  // Simplified type to just string | null
  BrowImage: string = localStorage.getItem("BrowImage") || ''
  constructor(private camera: Camera, private router: Router) {
    this.BrowImage = localStorage.getItem("BrowImage") || ''
  }
 
  ngOnInit(): void {
    // if (!localStorage.getItem("verified")) this.router.navigate(["/otp"]);
  }
 
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //       console.log('File selected, image data length:', this.selectedImage);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
 
  async captureImage() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      allowEdit: false
    };
 
    try {
      const imageData = await this.camera.getPicture(options);
      this.BrowImage = '' + imageData;
 
      console.log('Image captured, data URL length:', this.BrowImage);
      localStorage.setItem("BrowImage", imageData)
      // Force change detection by creating a new reference
      this.BrowImage = this.BrowImage + '';
    } catch (error) {
      console.error('Camera Error:', error);
    }
    // windo
    window.location.reload();
  }
 
  async selectFromGallery() {
    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };
 
    try {
      const imageData = await this.camera.getPicture(options);
      this.BrowImage = '' + imageData;
      console.log('Gallery image selected, data URL length:', this.BrowImage);
      localStorage.setItem("BrowImage", imageData)
 
      // Force change detection by creating a new reference
      this.BrowImage = this.BrowImage + '';
 
      // rama.nativeElement.src=imageData;
    } catch (error) {
      console.error('Gallery Error:', error);
    }
    // window.location.reload();
  }
 
  // Check if image is valid for debugging
  // isValidImage(): boolean {
  //   return this.selectedImage !== null &&
  //          this.selectedImage.startsWith('data:image') &&
  //          this.selectedImage.length > 100;
  // }
}
