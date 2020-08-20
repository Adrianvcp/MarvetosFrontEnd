import { Component, OnInit } from "@angular/core";
//Components
import { EmailConfirmationService } from "../../services/email-confirmation.service";

//Alerts
import Swal from "sweetalert2";

@Component({
  selector: "app-orderquestion",
  templateUrl: "./orderquestion.component.html",
  styleUrls: ["./orderquestion.component.css"],
})
export class OrderquestionComponent implements OnInit {
  ticket = {
    orderId: "",
    email: "",
    problema: "",
  };

  constructor(private emailservice: EmailConfirmationService) {}

  ngOnInit() {}

  sendTicket() {
    //Validaciones
    if (
      this.ticket.orderId == "" ||
      this.ticket.email == "" ||
      this.ticket.problema == ""
    ) {
      Swal.fire({
        title: "Datos Faltantes",
        text: "Por favor ingrese todos los campos!",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar!",
      }).then((result) => {
        if (result.value) {
        }
      });
    } else {
      //Enviar correo
      this.emailservice.sendticket(this.ticket).subscribe(
        (res) => {
         
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
 
  }
}
