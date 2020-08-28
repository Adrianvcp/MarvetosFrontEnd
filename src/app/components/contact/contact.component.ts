import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { dirname } from "path";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";

import Swal from "sweetalert2";

/* Services */
import { LoginService } from "../../services/login.service";
import { EmailConfirmationService } from "../../services/email-confirmation.service";
import { CotizacionService } from "../../services/cotizacion.service";

//model
import { Cotizacion } from "../../model/cotizacion";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  title = "read-excel-in-angular8";
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;

  //Objeto Cotizacion
  ObjCotizacion = {
    IDCotizacion: 0,
    NNombreArchivo: "",
    FechaSubida: "",
    idUser: 0,
    Source: "",
  };

  //New
  @ViewChild("UploadFileInput", { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  constructor(
    private emailservice: EmailConfirmationService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private cotizacionService: CotizacionService
  ) {}

  ngOnInit() {
    this.fileUploadForm = this.formBuilder.group({
      myfile: [""],
    });
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    console.log(event.target);
    console.log(this.fileUploaded);
    this.readExcel();
  }

  alertContinue(pText, pTitle) {
    Swal.fire({
      text: pText,
      title: pTitle,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Lo entiendo",
    }).then((result) => {
      if (result.value) {
      }
    });
  }
  //Send Email
  Mailto() {
    //Objet with address and district
    var ObjEmail = {
      email: "pedro.velacc@gmail.com",
    };
    this.emailservice.sendEmailConfirmation(ObjEmail).subscribe(
      (res) => {
        console.log("Resultado email confirmacion");
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  readExcel() {
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
    };
    readFile.readAsArrayBuffer(this.fileUploaded);
    console.log(dirname);
  }

  readAsExcel() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);
    const data: Blob = new Blob([this.csvData], {
      type: "text/csv;charset=utf-8;",
    });
    var a = FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + ".csv");
    console.log(a);
    const formData = new FormData();
    //formData.append('file', );
    this.emailservice.uploadExcel("pedro.velacc@gmail.com", formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  excel() {
    const formData = new FormData();
    //formData.append('file', file.data);
    this.emailservice.uploadExcel("pedro.velacc@gmail.com", formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  }

  onFileSelect(event) {
    let af = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        Swal.fire({
          icon: "warning",
          title: "Solo esta permitido archivos excel!!!",
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {});
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get("myfile").setValue(file);
      }
    }
  }

  async onFormSubmit() {
    const formData = new FormData();
    formData.append("file", this.fileUploadForm.get("myfile").value);
    formData.append("agentId", "007");
    if (!this.fileUploadForm.get("myfile").value) {
      Swal.fire({
        icon: "warning",
        title: "Ingrese un archivo excell, por favor!!",
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {});
    }
    //Cliente Logueado
    else if (this.loginService.getToken() != "") {
      var dataLoginToken = await this.loginService.givemeData(
        this.loginService.getToken()
      );

      //service cotizacion
      this.cotizacionService.sendCotizacion(dataLoginToken, formData).subscribe(
        (res) => {
          try {
            this.insertCotizacion(
              dataLoginToken.id,
              this.fileInputLabel,
              "backend"
            );

            this.uploadFileInput.nativeElement.value = "";
            this.fileInputLabel = undefined;
            //insert on db cotizacion

            Swal.fire(
              "Cotizacion Enviada!",
              "En unos minutos la cotizacion sera respondida.",
              "success"
            );
          } catch (error) {
            Swal.fire("Error!", "No se pudo enviar .", "success");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.alertContinue("Debes ingresar con una cuenta!", "Lo sentimos");
    }
  }

  async insertCotizacion(p_idUser, p_nameArchivo, p_source) {
    this.ObjCotizacion.IDCotizacion = 1;
    this.ObjCotizacion.FechaSubida = "01/01/01";
    this.ObjCotizacion.Source = p_source;
    this.ObjCotizacion.NNombreArchivo = p_nameArchivo;
    this.ObjCotizacion.idUser = p_idUser;

    delete this.ObjCotizacion.FechaSubida;
    delete this.ObjCotizacion.IDCotizacion;

    await this.cotizacionService.saveCotizacion(this.ObjCotizacion).toPromise();
  }
}
