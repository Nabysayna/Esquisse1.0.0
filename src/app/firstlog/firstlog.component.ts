import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as sha1 from 'js-sha1';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-firstlog',
  templateUrl: './firstlog.component.html',
  styleUrls: ['./firstlog.component.css']
})
export class FirstlogComponent implements OnInit {
  notMatching = false ;
  wrongCurrrentPwd = false ;
  pwdactuel : string ;
  newpwd : string ;
  confirmpdw : string ;

  loading = false ;

  constructor(private router: Router, private _authService:AuthService){ }

  ngOnInit() {
  }

  modifierPwd(){
  	if (this.confirmpdw==this.newpwd){
    	this.loading = true ;
      this._authService.modifpwdinit({pwdactuel:sha1(this.pwdactuel), newpwd:sha1(this.newpwd)}).subscribe(
        resp => {
          if(resp!='badpwd'){
            this.router.navigate(['']);
          }else{
            this.notMatching=false ;
            this.wrongCurrrentPwd=true ;
            this.pwdactuel = undefined ;
            this.newpwd = undefined ;
            this.confirmpdw = undefined ;
          }
        },
        error => console.log(error),
        () => {
          this.loading = false ;
          console.log("Here Dashboard Test")
        }
      );
    }else{
      this.wrongCurrrentPwd=false ;
      this.notMatching=true ;
      this.pwdactuel = undefined ;
      this.newpwd = undefined ;
      this.confirmpdw = undefined ;
    }
  }

}
