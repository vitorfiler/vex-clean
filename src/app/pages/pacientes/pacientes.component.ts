import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { CommomService } from 'src/app/services/commom.service';
import { Paciente } from 'src/app/_models/paciente';

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
	preencheTable: Paciente[] = [];
	displayedColumns: string[] = [
		"Nome",
		"CPF"
	];
	@ViewChild(MatPaginator) paginator: MatPaginator;


	constructor(private commomService: CommomService, private router: Router) { }

	ngOnInit(): void {
		var retornoValida = this.commomService.validaSessao();
		if (!retornoValida) {
			this.router.navigate(['login']);
			return;
		}
		this.getInfoPacientes();
	}

	async getInfoPacientes() {

		this.preencheTable = []
		// this.load = true;
		this.commomService.getPacientes()
			.subscribe(response => {
				console.log(response.body);
				// this.load = false;
				if (response) {
					response.body.forEach((paciente, index, array) => {
						let table = new Paciente();
						table.cpf = paciente.cpf;
						table.nome = paciente.nome;

						this.preencheTable.push(table);
						// this.dataSource.paginator = this.paginator;
					});
				}
				this.dataSource = new MatTableDataSource(this.preencheTable);

			},
				(error) => {
					// this.load = false;
					console.log(error.message);
					// this.snackbar.open(MessagesSnackBar.LOGIN_ERRO, 'Close', { duration: 9000 });
				});
	}

}
