import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from './login.service';



@Injectable({
	providedIn: 'root'
})
export class CommomService {

	constructor(private http: HttpClient,
		private route: Router,
		private snackBar: MatSnackBar,
		private loginService: LoginService
	) { }
	
	token = localStorage.getItem("token")
	headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'})
	headersGet: HttpHeaders = new HttpHeaders({ 'Authorization': this.token})
	url: String = '/uc'

	logout() {
		localStorage.clear();
		this.route.navigate(['/login']);
	}

	getPacientes(): Observable<any> {
		return this.http.get(`${environment.URL_API}/buscarTodos`, { observe: "response", headers: this.headersGet});
	}

	cadastrarPaciente(string: string): Observable<any> {
		return this.http.post(`${environment.URL_API}`, string, { observe: "response", headers: this.headers });
	}
	

	// put(urlName: string, body: string, clientId: string): Observable<any> {
	//   return this.http.put(`${environment.url}${urlName}`, body, { params: {
	//     clienteID: clientId, }, observe: "response", headers: this.headers });
	// }

	// delete(urlName: string): Promise<any> {
	//   let promise = this.http.get(`${environment.url}${urlName}`, { observe: "response", headers: this.headers }).toPromise();
	//   return promise
	// }

	validaSessao() {
		return this.loginService.validaSessao();
	}
}
