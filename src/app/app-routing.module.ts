import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroPacienteComponent } from './pages/cadastro-paciente/cadastro-paciente.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      { path: 'pacientes', component: PacientesComponent },
      { path: 'cad-paciente', component: CadastroPacienteComponent }
    ],
  },
  { path: 'cad-usuario', component: CadastroUsuarioComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
