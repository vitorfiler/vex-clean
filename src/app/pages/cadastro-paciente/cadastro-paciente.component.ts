import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { ScrollbarComponent } from 'src/@vex/components/scrollbar/scrollbar.component';
import { CommomService } from 'src/app/services/commom.service';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { Medico } from 'src/app/_models/medico';
import { Endereco, Paciente } from 'src/app/_models/paciente';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import icClose from '@iconify/icons-ic/twotone-close';
import { EventEmitterService } from 'src/app/services/event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/constants/messagesSnackBar';
import { Estado } from 'src/app/_models/estado';
import { estados } from 'src/app/_utils/cidades-estados/estados';
import { cidades } from 'src/app/_utils/cidades-estados/cidades';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/_models/cidade';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
	selector: 'vex-cadastro-paciente',
	templateUrl: './cadastro-paciente.component.html',
	styleUrls: ['./cadastro-paciente.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class CadastroPacienteComponent implements OnInit {

	form: FormGroup;
	inputType = 'password';
	visible = false;
	cadastrando: Boolean = false;

	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;

	medicos: Medico[] = [];
	paciente: Paciente = new Paciente();
	endereco: Endereco = new Endereco();
	pacienteId: string;
	result: string;
	estadosForm = new FormControl();
	estados: Observable<Estado[]>;
	optionsEstados: Estado[] = estados;
	
	cidadeSelecionada: string;

	cidadesForm = new FormControl();
	options: Cidade[] = cidades;
	cidades: Observable<Cidade[]>;

	@ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;

	constructor(private commomService: CommomService,
		private cd: ChangeDetectorRef,
		private fb: FormBuilder,
		private router: Router,
		private dialog: MatDialog,
		private snackbar: MatSnackBar
	) { }

	ngOnInit(): void {
		EventEmitterService.get('salvarMedico').subscribe(() => this.buscarMedicos());
		this.pacienteId = window.localStorage.getItem("pacienteId");
		this.buscarPacientePorId();
		this.buscarMedicos();
		this.formVazio();
		if (this.pacienteId) this.formEditar();
		this.estados = this.estadosForm.valueChanges
			.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : value.name),
				map(name => name ? this._filtraEstados(name) : this.optionsEstados.slice())
			);

		this.cidades = this.cidadesForm.valueChanges
			.pipe(
			  startWith(''),
			  map(value => typeof value === 'string' ? value : value.name),
			  map(name => name ? this._filtraCidades(name) : this.options.slice())
			);
	}

	filtro(event){
		console.log(event.option.value);
		let estado = event.option.value;Uint8Array
		let cidadesFiltradas = [];
		cidades.forEach(cidade => {
			if(cidade.estado === estado.id){
				cidadesFiltradas.push(cidade)
			}
		});
		this.cidades = this.cidadesForm.valueChanges.pipe(
			startWith(''),
			map(value => typeof value === 'string' ? value : value.name),
			map(name => name ? this._filtraCidades(name) : cidadesFiltradas.slice())
		);
	}
	displayCidades(cidade: Cidade): string {
		return cidade && cidade.nome ? cidade.nome : '';
	  }
	
	  private _filtraCidades(name: string): Cidade[] {
		const filterValue = name.toLowerCase();
	
		return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
	  }

	displayEstado(estado: Estado): string {
		return estado && estado.nome ? estado.nome : '';
	}

	private _filtraEstados(name: string): Estado[] {
		const filterValue = name.toLowerCase();

		return this.optionsEstados.filter(option => option.nome.toLowerCase().includes(filterValue));
	}

	consultaCep(cep: string) {
		this.commomService.consultaCep(cep).subscribe(response => {
			this.endereco.cidade = response.body.localidade
			this.endereco.estado = response.body.uf
			this.endereco.logradouro = response.body.logradouro
			this.endereco.logradouro = response.body.logradouro
			this.endereco.bairro = response.body.bairro
		})
	}

	renderizarModal() {
		this.dialog.open(DemoDialogComponent, {
			disableClose: false,
			width: '900px',
		}).afterClosed().subscribe(result => {
			this.result = result;
		});
	}

	async formEditar() {
		const medico = this.medicos.find((m) => m.id == this.paciente.medicoID);
		this.form = this.fb.group({
			nome: [this.paciente.nome, Validators.required],
			cpf: [this.paciente.cpf, Validators.required],
			telefone: [this.paciente.telefone, Validators.required],
			medico: [medico.id, Validators.required],
			observacao: [this.paciente.observacao],
			rua: [this.paciente.endereco.logradouro, Validators.required],
			cep: [this.paciente.endereco.cep, Validators.required],
			numero: [this.paciente.endereco.numero, Validators.required],
			bairro: [this.paciente.endereco.bairro, Validators.required],
			complemento: [this.paciente.endereco.complemento, Validators.required],
			estado: [this.paciente.endereco.estado, Validators.required],
			cidade: [this.paciente.endereco.cidade, Validators.required],
		});
	}
	formVazio() {
		this.form = this.fb.group({
			nome: ['', Validators.required],
			cpf: ['', Validators.required],
			telefone: ['', Validators.required],
			medico: ['', Validators.required],
			observacao: [''],
			rua: ['', Validators.required],
			cep: ['', Validators.required],
			numero: ['', Validators.required],
			bairro: ['', Validators.required],
			complemento: ['', Validators.required],
			estado: ['', Validators.required],
			cidade: ['', Validators.required],
		});
	}

	buscarMedicos() {
		this.commomService.getMedicos().subscribe(response => {
			this.medicos = response.body;
		})
	}

	buscarPacientePorId() {
		this.commomService.getPaciente(this.pacienteId).subscribe(response => {
			this.paciente = response.body;
			this.endereco = this.paciente.endereco;
		})
	}

	format(date) {
		date = new Date(date);

		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();

		return year + '-' + month + '-' + day;
	}

	enviarPaciente(paciente: Paciente, endereco: Endereco) {
		let dtPrescricao: Date = new Date();
		paciente.dtPrescricao = this.format(dtPrescricao);
		paciente.endereco = endereco;
		paciente.ativo = true;
		const body: any = paciente;
		paciente.id ? this.atualizar(body) : this.cadastrar(body);
	}

	atualizar(body: string) {
		this.commomService.atualizarPaciente(body).subscribe(() => {
			this.router.navigate(['/pacientes'])
			this.snackbar.open(MessagesSnackBar.ATUALIZACAO, 'Fechar', { duration: 4000 });
		}, (error) => {
			console.log(error.message);
			this.snackbar.open(MessagesSnackBar.ATUALIZACAO_ERRO, 'Fechar', { duration: 4000 });
		})
	}
	cadastrar(body: string) {
		this.commomService.cadastrarPaciente(body).subscribe(() => {
			this.router.navigate(['/pacientes'])
			this.snackbar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
		}, (error) => {
			this.snackbar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
			console.log(error.message);
		})
	}


	toggleVisibility() {
		if (this.visible) {
			this.inputType = 'password';
			this.visible = false;
			this.cd.markForCheck();
		} else {
			this.inputType = 'text';
			this.visible = true;
			this.cd.markForCheck();
		}
	}
}

@Component({
	selector: 'vex-components-overview-demo-dialog',
	template: `

        <div mat-dialog-title fxLayout="row" fxLayoutAlign="space-between center">
            <div style="font-weight: bolder;">Cadastrar Médico</div>
          <button type="button" mat-icon-button (click)="close('No answer')" tabindex="-1">
              <mat-icon [icIcon]="icClose"></mat-icon>
          </button>
        </div>

        <mat-dialog-content style="text-align: left; font-family:Nunito;">
		<div [formGroup]="form" class="p-6" fxLayout="column" fxLayoutGap="16px">
			<div fxFlex="auto" fxLayout="column">
				<div style="text-align: left;">
					<h4 class="body-2 text-secondary m-0">Dados do Médico: </h4>
				</div>
				<div class="row">
					<div class="col">
						<mat-form-field fxFlex="grow" appearance="outline">
							<mat-label>Nome completo</mat-label>
							<input [(ngModel)]="medico.nome" formControlName="cpf" matInput required>
						</mat-form-field>
					</div>
					<div class="col">
						<mat-form-field fxFlex="grow" appearance="outline">
							<mat-label>CRM</mat-label>
							<input [(ngModel)]="medico.nuCrm" formControlName="telefone" matInput required>
						</mat-form-field>
					</div>
				</div>
			</div>
		</div>
        </mat-dialog-content>

		<style>
			.mat-raised-button{
				width: 250px !important;
				margin: 10px 10px;
			}
		</style>
		<mat-dialog-actions style="margin: auto" align="center">
			<button mat-raised-button (click)="close('No')">Cancelar</button>
			<button [disabled]="form.invalid" mat-raised-button color="primary" (click)="enviar(medico)">Salvar</button>
		</mat-dialog-actions>
    `
})
export class DemoDialogComponent implements OnInit {

	medico: Medico = new Medico();
	form: FormGroup;
	icClose = icClose;
	economiaAnual: string = "";
	constructor(private snackbar: MatSnackBar, private commomService: CommomService, private fb: FormBuilder, private dialogRef: MatDialogRef<DemoDialogComponent>, private router: Router) {
	}
	ngOnInit(): void {
		this.form = this.fb.group({
			cpf: ['', Validators.required],
			telefone: ['', Validators.required],
		});
	}

	enviar(medico: Medico) {
		const body: any = medico
		this.commomService.cadastrarMedico(body).subscribe(() => {
			this.snackbar.open(MessagesSnackBar.CADASTRO_MEDICO, 'Fechar', { duration: 4000 });
			EventEmitterService.get('salvarMedico').emit();
			this.close('Yes');
		}, (error) => {
			console.log(error.message);
			// this.cadastrando = false;
			this.snackbar.open(MessagesSnackBar.CADASTRO_MEDICO_ERRO, 'Fechar', { duration: 4000 });
		})
	}

	close(answer: string) {
		this.dialogRef.close(answer);
	}
}
