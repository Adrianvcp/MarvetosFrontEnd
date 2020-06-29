import { Component, OnInit } from '@angular/core';
import { AllService } from "../../services/all.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  
  ordenes: any = [];

  constructor(
    private allService: AllService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.allService.getOneBuy(params.id).subscribe(
        (res) => {
          this.ordenes = res;
          console.log(res)
        },
        (err) => console.error(err)
      );
    }
  }

}
