import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private http: HttpClient, private routes: ActivatedRoute) { }
	headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
	urlLogin = `${environment.URL_LOGIN}`;

	login(username: string, password: string): Observable<any> {
		const body: any = {
			"usuario": username,
			"senha": password
		};
		return this.http.post(`${this.urlLogin}`, body, { observe: "response", headers: this.headers });
	}

	validaSessao() {
		let token = localStorage.getItem("token");
		if (token == null || token == '' || token == 'undefined') {
			return false;
		}
		return true;
	}
}
