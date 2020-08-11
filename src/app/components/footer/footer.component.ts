import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  conocenos(){
   
    this.router.navigateByUrl("/conocenos");
  }
  covid(){
   
    this.router.navigate(['covid']);
  }
  contactenos(){
   
    this.router.navigate(['contacto']);
  }

}
