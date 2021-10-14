import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CommomService } from 'src/app/services/commom.service';
import { Paciente } from 'src/app/_models/paciente';
import { Usuario } from 'src/app/_models/usuario';

@Component({
	selector: 'vex-pacientes',
	templateUrl: './pacientes.component.html',
	styleUrls: ['./pacientes.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class PacientesComponent implements OnInit {

	dataSource: MatTableDataSource<Paciente>;
	listTableGD: any[] = [];
	pacientes: Paciente[] = [];
	displayedColumns: string[] = [
		"Nome",
		"CPF",
		"NomeMedico",
		"DtPrescricao",
		"Status",
		"Acoes"
	];
	form: FormGroup;
	@ViewChild(MatPaginator) paginator: MatPaginator;


	constructor(private commomService: CommomService, 
		private router: Router,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		window.localStorage.removeItem("pacienteId")
		var retornoValida = this.commomService.validaSessao();
		if (!retornoValida) {
			this.router.navigate(['login']);
			return;
		}
		this.form = this.fb.group({
			filtro: [""]
		});
		this.getInfoPacientes();
	}

	filtrar(){
		let filtro = this.form.get("filtro").value
		this.commomService.filtrar(filtro).subscribe(response=>{
			if (response) {
				this.pacientes = response.body;
				setTimeout(() => this.dataSource.paginator = this.paginator);
			}
			this.dataSource = new MatTableDataSource(this.pacientes);
		})
	}

	editarPaciente(id: string){
		window.localStorage.setItem("pacienteId", id);
		this.router.navigate(['/cad-paciente'])
	}

	async getInfoPacientes() {
		this.pacientes = []
		// this.load = true;
		this.commomService.getPacientes()
			.subscribe(response => {
				if (response) {
					this.pacientes = response.body;
					setTimeout(() => this.dataSource.paginator = this.paginator);
				}
				this.dataSource = new MatTableDataSource(this.pacientes);

			},
				(error) => {
					// this.load = false;
					console.log(error.message);
				});
	}

	deletarPaciente(id: string){
		this.commomService.deletePaciente(id).subscribe(()=>{
			this.getInfoPacientes();
		})
	}

}
