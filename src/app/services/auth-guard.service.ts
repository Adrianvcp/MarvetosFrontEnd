import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  routeURL: string;

  constructor(private authService: LoginService, private router: Router) {
    this.routeURL = this.router.url;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.authService.getToken() == "") {
        return resolve(false);
      } else {
        this.routeURL = this.router.url;
        return resolve(true);
      }
    });
  }
}
