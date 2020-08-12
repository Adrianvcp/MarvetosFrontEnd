import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { EmailConfirmationService } from "../../services/email-confirmation.service";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { dirname } from "path";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import * as _ from "lodash";

import { LoginService } from "../../services/login.service";
import Swal from "sweetalert2";

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

  //New
  @ViewChild("UploadFileInput", { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  constructor(
    private emailservice: EmailConfirmationService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loginService: LoginService
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
        alert("Solo esta permitido archivos excel!");
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get("myfile").setValue(file);
      }
    }
  }

  async onFormSubmit() {
    if (!this.fileUploadForm.get("myfile").value) {
      alert("Por favor agrege un archivo excel!");
      return false;
    }

    const formData = new FormData();
    formData.append("file", this.fileUploadForm.get("myfile").value);
    formData.append("agentId", "007");

    //Cliente Logueado
    if (this.loginService.getToken() != "") {
      var dataLoginToken = await this.loginService.givemeData(
        this.loginService.getToken()
      );

      console.log(dataLoginToken);
      console.log("------------");
      this.http
        .post<any>(
          `http://localhost:5000/api/email/excel/upload/${dataLoginToken.email}`,
          formData
        )
        .subscribe(
          (response) => {
            console.log(response);
            if (response.statusCode === 200) {
              // Reset the file input
              this.uploadFileInput.nativeElement.value = "";
              this.fileInputLabel = undefined;
            }

            Swal.fire(
              "Comprado!",
              "En unos minutos te llegara la confirmacion a tu correo.",
              "success"
            );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.alertContinue("Debes ingresar con una cuenta!", "Lo sentimos");
    }
  }
}
