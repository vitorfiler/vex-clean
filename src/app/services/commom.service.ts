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
		private loginService: LoginService
	) { }

	token = localStorage.getItem("token")
	// .replace('"',"").replace('"',"")
	headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
	headersToken: HttpHeaders = new HttpHeaders({ 'Authorization': this.token })

	logout() {
		localStorage.clear();
		this.route.navigate(['/login']);
	}

	getMedicos(): Observable<any>{
		return this.http.get(`${environment.URL_API}/medico/todos`, { observe: "response", headers: this.headersToken });
	}

	getEstadosBr(){
		return this.http.get("/src/app/_utils/cidades-estados/estados.json")
	}

	getPacientes(): Observable<any> {
		return this.http.get(`${environment.URL_API}/paciente/todos`, { observe: "response", headers: this.headersToken });
	}

	getPaciente(pacienteId: string): Observable<any> {
		return this.http.get(`${environment.URL_API}/paciente`,{ params: {
			id: pacienteId}, observe: "response", headers: this.headersToken });
    }

	filtrar(filtro: string): Observable<any> {
		return this.http.get(`${environment.URL_API}/paciente/filtro`,{ params: {
			filtro: filtro}, observe: "response", headers: this.headersToken });
    }

	cadastrarUsuario(body: string): Observable<any> {
		return this.http.post(`${environment.URL_API}/usuario`, body, { observe: "response", headers: this.headers });
	}

	cadastrarPaciente(body: string): Observable<any> {
		return this.http.post(`${environment.URL_API}/paciente`, body, { observe: "response", headers: this.headersToken });
	}

	cadastrarMedico(body: string): Observable<any> {
		return this.http.post(`${environment.URL_API}/medico`, body, { observe: "response", headers: this.headersToken });
	}

	atualizarPaciente(body: string): Observable<any> {
		return this.http.put(`${environment.URL_API}/paciente`, body, { observe: "response", headers: this.headersToken });
	}

	consultaCep(cep: string): Observable<any> {
		this.headers.set('Access-Control-Allow-Origin', '*');
		this.http.get(`https://cors-anywhere.herokuapp.com//viacep.com.br/ws/88058400/json`);
		return this.http.get(`http://viacep.com.br/ws/${cep}/json`, { observe: "response", headers: this.headers });
	}

	deletePaciente(id: string): Observable<any> {
		return this.http.delete(`${environment.URL_API}/paciente`, {
			params: {
				id: id,
			},
			observe: "response",
			headers: this.headersToken
		})
	}

	validaSessao() {
		return this.loginService.validaSessao();
	}
}
