import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { environment } from 'src/environments/environment';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { ScrollbarComponent } from 'src/@vex/components/scrollbar/scrollbar.component';
import { CommomService } from 'src/app/services/commom.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/constants/messagesSnackBar';

@Component({
	selector: 'vex-cadastro-usuario',
	templateUrl: './cadastro-usuario.component.html',
	styleUrls: ['./cadastro-usuario.component.scss'],
	animations: [
		fadeInUp400ms,
		stagger20ms
	]
})
export class CadastroUsuarioComponent implements OnInit {

	form: FormGroup;
	inputType = 'password';
	visible = false;
	cadastrando: Boolean = false;

	icVisibility = icVisibility;
	icVisibilityOff = icVisibilityOff;
	@ViewChild(ScrollbarComponent, { static: true }) scrollbar: ScrollbarComponent;

	constructor(private snackbar: MatSnackBar, private commomService: CommomService, private cd: ChangeDetectorRef, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			cpf: ['', Validators.required],
			nome: ['', Validators.required],
			telefone: ['', Validators.required],
			sexo: ['', Validators.required],
			senha: new FormControl(
				'', [Validators.required]
			),
			ConfirmarSenha: ['', Validators.required],
		}, { validator: this.checkPasswords });
	}
	checkPasswords(group: FormGroup) {
		let senha = group.get('senha').value;
		let confirmaSenha = group.get('ConfirmarSenha').value;

		return senha === confirmaSenha ? null : { notSame: true }
	}

	montarBody(): any {

		let body = {
			"cpf": this.form.get('cpf').value,
			"nome": this.form.get('nome').value,
			"sexo": this.form.get('sexo').value,
			"telefone": this.form.get('telefone').value,
			"senha": this.form.get('senha').value,
		}
		return body;
	}

	cadastrar() {
		const body: any = this.montarBody();
		this.commomService.cadastrarUsuario(body).subscribe(response => {
			console.log(response);

			this.snackbar.open(MessagesSnackBar.CADASTRO, 'Fechar', { duration: 4000 });
			this.form.reset();
			// this.cadastrando = false;
		},
			(error) => {
				console.log(error.message);
				// this.cadastrando = false;
				this.snackbar.open(MessagesSnackBar.CADASTRO_ERRO, 'Fechar', { duration: 4000 });
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
