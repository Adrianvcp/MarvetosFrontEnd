import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  arrayBuffer: any;
  file: File;

  constructor() {}

  ngOnInit() {}
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    console.log("GA");
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var obj = {};
      obj = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(obj);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}
