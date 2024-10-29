import { Component } from '@angular/core';

import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'

import { FileService } from './services/file.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FileService
  ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Rafael',
      email: 'rafael.Valencia',
      password: '2003'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  // login() {
  //   this.authService.loginAndGet('rafael.Valencia','2003')
  //   .subscribe(user => {
  //     this.profile = user;
  //   });
  // }

  // getProfile() {
  //   this.authService.profiel(this.token)
  //   .subscribe(profile => {
  //     console.log(profile);
  //   })
  // }

  downloadPdf() {
    this.fileService.getFile('my.pdf', 'https://api.escuelajs.co/api/v1/files/f3a5.png', 'application/png')
    .subscribe()
  }
}
