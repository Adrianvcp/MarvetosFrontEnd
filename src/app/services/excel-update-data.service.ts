import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
const { read, write, utils } = XLSX;
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExcelUpdateDataService {
  constructor() {}
}
