import { Component, OnInit } from "@angular/core";
import { EmailConfirmationService } from "../../services/email-confirmation.service";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

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

  constructor(private emailservice: EmailConfirmationService) {}

  ngOnInit() {}

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0];
    this.readExcel();
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
  }

  readAsExcel() {
    this.csvData = XLSX.utils.sheet_to_csv(this.worksheet);
    const data: Blob = new Blob([this.csvData], {
      type: "text/csv;charset=utf-8;",
    });
    FileSaver.saveAs(data, "CSVFile" + new Date().getTime() + ".csv");

    this.Mailto();
  }
}
