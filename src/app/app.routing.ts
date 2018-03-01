import  { RouterModule, Routes} from '@angular/router' ;

import { AuthGuard } from './_guards/auth.guard';
import { AuthGuardsup } from './_guards/authsup.guard';
import { AuthGuardcais } from './_guards/authcais.guard';

import { AdminpdvAidedecisionComponent } from './adminpdv/adminpdv-aidedecision/adminpdv-aidedecision.component';
import { AdminpdvDashboardComponent } from './adminpdv/adminpdv-dashboard/adminpdv-dashboard.component';
import { AdminpdvMonitoringComponent } from './adminpdv/adminpdv-monitoring/adminpdv-monitoring.component';
import { AdminpdvStatusReclamationComponent } from './adminpdv/adminpdv-status-reclamation/adminpdv-status-reclamation.component';

import { AdminmultipdvDashboardComponent } from './admin-multi-pdv/admin-multi-pdv-dashboard/admin-multi-pdv-dashboard.component';
import { AdminmultipdvDemandeRetraitComponent } from './admin-multi-pdv/admin-multi-pdv-demande-retrait/admin-multi-pdv-demande-retrait.component';
import { AdminmultipdvMonitoringComponent } from './admin-multi-pdv/admin-multi-pdv-monitoring/admin-multi-pdv-monitoring.component';
import { AdminmultipdvStatusPdvComponent } from './admin-multi-pdv/admin-multi-pdv-status-pdv/admin-multi-pdv-status-pdv.component';
import { AdminmultipdvStatusReclamationComponent } from './admin-multi-pdv/admin-multi-pdv-status-reclamation/admin-multi-pdv-status-reclamation.component';
import { AdminmultipdvUpdateCautionComponent } from './admin-multi-pdv/admin-multi-pdv-update-caution/admin-multi-pdv-update-caution.component';

import { CommissionnementComponent } from './commissionnement/commissionnement.component';

import { ZoningComponent } from './zoning/zoning.component';

import { AuthComponentComponent } from './auth-component/auth-component.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AccueiladminpdvComponent } from './accueiladminpdv/accueiladminpdv.component';
import { AccueilAdminMultiPdvComponent } from './accueil-admin-multi-pdv/accueil-admin-multi-pdv.component';
import { OrangeMoneyComponentComponent } from './orange-money-component/orange-money-component.component';
import { PostcashComponent } from './postcash/postcash.component';
import { TigoCashComponentComponent } from './tigo-cash-component/tigo-cash-component.component';
import { WizallComponent } from './wizall/wizall.component';
import { panierComponent } from './panier/panier.component';
import { RapidoComponent} from './rapido/rapido.component';

import { CrmComponent } from './crm/crm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { DemandepretComponent } from './demandepret/demandepret.component';
import { GestionreportingComponent } from './gestionreporting/gestionreporting.component';
import { SoldecompteComponent } from './soldecompte/soldecompte.component';
import { ExpressoComponent } from './expresso/expresso.component';
import { TntComponent } from './tnt/tnt.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { ConsulterpretComponent } from './consulterpret/consulterpret.component';
import { FirstlogComponent } from './firstlog/firstlog.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { ChallengeresultsComponent } from './challengeresults/challengeresults.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { AnnoncesuperviseurComponent } from './annoncesuperviseur/annoncesuperviseur.component';
import { SdeComponent } from './sde/sde.component';
import { WoyofalComponent } from './woyofal/woyofal.component';
import { SenelecComponent } from './senelec/senelec.component';
import { OoluComponent } from './oolu/oolu.component';


import { AdminpdvparametrecompteComponent } from './adminpdv/adminpdv-parametre-compte/adminpdv-parametre-compte.component';
import {ImpressionComponent} from "./impression/impression.component";
import {GuideUserCaisseComponent} from "./guideusercaisse/guideusercaisse.component";
import {GuideUserSuperviseurComponent} from "./guideusersuperviseur/guideusersuperviseur.component";
import {ImpressionadminpdvComponent} from "./impressionadminpdv/impressionadminpdv.component";
import {AdminmultipdvCreditationCCComponent} from "./admin-multi-pdv/admin-multi-pdv-creditation-cc/admin-multi-pdv-creditation-cc.component";
import {AdminmultipdvSuivipointComponent} from "./admin-multi-pdv/admin-multi-pdv-suivipoint/admin-multi-pdv-suivipoint.component";


const appRoutes: Routes = [
    { path: '', component: AuthComponentComponent },
    { path: 'soppipwdbifi', component: FirstlogComponent, canActivate: [AuthGuardsup] },
    { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuardcais],
           children:[
                {path: '', component: ECommerceComponent},
                {path: 'commissionnement', component: CommissionnementComponent},
                {path: 'challenge', component: ChallengeresultsComponent },
    			      {path: 'ORANGEMONEY', component: OrangeMoneyComponentComponent},
                {path: 'POSTECASH', component: PostcashComponent},
                {path: 'TIGOCASH', component: TigoCashComponentComponent},
                {path: 'WIZALL', component: WizallComponent},
                {path: 'CRM', component: CrmComponent},
                {path: 'DASHBOARD', component: DashboardComponent},
                {path: 'E-COMMERCE', component: ECommerceComponent},
                {path: 'DEMANDEPRET', component: DemandepretComponent},
                {path: 'GESTIONREPORTING', component: GestionreportingComponent},
                {path: 'EXPRESSO', component: ExpressoComponent},
                {path: 'TNT BY EXCAF', component: TntComponent},
                {path: 'SOLDE DU COMPTE', component: SoldecompteComponent},
                {path: 'impression', component: ImpressionComponent},
                {path: 'Guide_utilisation', component: GuideUserCaisseComponent},
                {path: 'gestionnaire', component: GestionnaireComponent},
                {path: 'annonce', component: AnnoncesComponent},
                {path: 'panier', component: panierComponent},
                {path: 'rapido',component:RapidoComponent},
                {path: 'sde',component:SdeComponent},
                {path: 'woyofal',component:WoyofalComponent},
                {path: 'senelec',component:SenelecComponent},
                {path: 'oolu',component:OoluComponent}
    		]
    },
    { path: 'accueiladmmpdv', component: AccueilAdminMultiPdvComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: AdminmultipdvDashboardComponent },
            { path: 'dashboard', component: AdminmultipdvDashboardComponent },
            { path: 'monitoring', component: AdminmultipdvMonitoringComponent },
            { path: 'statuspdv', component: AdminmultipdvStatusPdvComponent },
            { path: 'statusreclamation', component: AdminmultipdvStatusReclamationComponent },
            { path: 'crediterccc', component: AdminmultipdvCreditationCCComponent  },
            { path: 'demanderetrait', component: AdminmultipdvDemandeRetraitComponent },
            { path: 'suivipoints', component: AdminmultipdvSuivipointComponent },
            { path: 'updatecaution', component: AdminmultipdvUpdateCautionComponent },
            { path: 'zoning', component: ZoningComponent }
        ]
    },
    { path: 'accueiladmpdv', component: AccueiladminpdvComponent, canActivate: [AuthGuardsup],
        children: [
            {
                path: '',
                children: [
                    { path: 'challenge', component: ChallengeresultsComponent },
                    { path: 'commissionnement', component: CommissionnementComponent },
                    { path: 'dashboard', component: AdminpdvDashboardComponent },
                    { path: 'monitoring', component: AdminpdvMonitoringComponent },
                    { path: 'parametrecompte', component: AdminpdvparametrecompteComponent },
                    { path: 'reclamation', component: AdminpdvStatusReclamationComponent },
                    { path: 'aidedecision', component: AdminpdvAidedecisionComponent },
                    { path: 'comptabilite', component: ComptabiliteComponent },
                    { path: 'CRM', component: CrmComponent },
                    { path: 'consulterpret', component: ConsulterpretComponent },
                    { path: '', component: AdminpdvDashboardComponent },
                    {path: 'Guide_utilisation', component: GuideUserSuperviseurComponent},
                    {path: 'gestionnaire', component: GestionnaireComponent},
                    {path: 'impressionadminpdv', component: ImpressionadminpdvComponent},
                    {path: 'annonce', component: AnnoncesuperviseurComponent},

                ]
            }
        ]
    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);
