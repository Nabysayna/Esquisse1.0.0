/*-----------------*/
/*      Modules     */
/*-----------------*/

import { NgModule }      from '@angular/core' ;
import { BrowserModule } from '@angular/platform-browser' ;
import  { FormsModule} from '@angular/forms' ;
import { HttpModule }    from '@angular/http';


import { LoadersCssModule } from 'angular2-loaders-css';

import {DataTableModule} from "angular2-datatable";
import { AlertModule, TabsModule, CollapseModule, ProgressbarModule, PopoverModule, ModalModule, TypeaheadModule, PaginationModule, AccordionModule} from 'ng2-bootstrap';

import { ChartsModule } from 'ng2-charts';

import {NgxPaginationModule} from 'ngx-pagination';


/*-----------------*/
/*      Services   */
/*-----------------*/

import { AchatJulaService} from './postcash/postservices';
import { ReglSenelecService} from './postcash/postservices';
import { AchatCodeWoyofalService} from './postcash/postservices';
import { RechargeEspeceService} from './postcash/postservices';
import { AchatCreditTelService} from './postcash/postservices';
import { RetraitEspeceService} from './postcash/postservices';
import { SoldeService} from './soldecompte/soldeservice';
import { CashInService} from './expresso/expressoservices';
import { CashOutService} from './expresso/expressoservices';
import { AgentTopUpService} from './expresso/expressoservices';
import { MyAccountService} from './expresso/expressoservices';
import { NAbonnementService} from './tnt/tntservices';
import { LAbonnementService} from './tnt/tntservices';
import { EFinancierService} from './tnt/tntservices';

import { TigocashService } from './services/tigocash.service';
import { AirtimeService } from './services/airtime.service';
import { ControleService } from './services/controle.service';



/*-----------------*/
/*      Routes     */
/*-----------------*/

import { Routing }        from './app.routing';
import { AuthGuard } from './_guards/auth.guard';
import { AuthGuardcais } from './_guards/authcais.guard';
import { AuthGuardsup } from './_guards/authsup.guard';



/*-----------------*/
/*      Components  */
/*-----------------*/

import { AppComponent } from './app.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';

import { AccueilComponent } from './accueil/accueil.component';
import { AccueiladminpdvComponent } from './accueiladminpdv/accueiladminpdv.component';
import { AccueilAdminMultiPdvComponent } from './accueil-admin-multi-pdv/accueil-admin-multi-pdv.component';

import { NavbarTopComponent } from './navbars/navbar-top/navbar-top.component';

import { AdminpdvAidedecisionComponent } from './adminpdv/adminpdv-aidedecision/adminpdv-aidedecision.component';
import { AdminpdvDashboardComponent } from './adminpdv/adminpdv-dashboard/adminpdv-dashboard.component';
import { AdminpdvMonitoringComponent } from './adminpdv/adminpdv-monitoring/adminpdv-monitoring.component';
import { AdminpdvStatusReclamationComponent } from './adminpdv/adminpdv-status-reclamation/adminpdv-status-reclamation.component';
import { AdminpdvparametrecompteComponent } from './adminpdv/adminpdv-parametre-compte/adminpdv-parametre-compte.component';

import { AdminmultipdvDashboardComponent } from './admin-multi-pdv/admin-multi-pdv-dashboard/admin-multi-pdv-dashboard.component';
import { AdminmultipdvDemandeRetraitComponent } from './admin-multi-pdv/admin-multi-pdv-demande-retrait/admin-multi-pdv-demande-retrait.component';
import { AdminmultipdvMonitoringComponent } from './admin-multi-pdv/admin-multi-pdv-monitoring/admin-multi-pdv-monitoring.component';
import { AdminmultipdvStatusPdvComponent } from './admin-multi-pdv/admin-multi-pdv-status-pdv/admin-multi-pdv-status-pdv.component';
import { AdminmultipdvStatusReclamationComponent } from './admin-multi-pdv/admin-multi-pdv-status-reclamation/admin-multi-pdv-status-reclamation.component';
import { AdminmultipdvUpdateCautionComponent } from './admin-multi-pdv/admin-multi-pdv-update-caution/admin-multi-pdv-update-caution.component';

import { RapidoComponent} from './rapido/rapido.component';
import { OrangeMoneyComponentComponent } from './orange-money-component/orange-money-component.component';
import { TigoCashComponentComponent } from './tigo-cash-component/tigo-cash-component.component';

import { CrmComponent } from './crm/crm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { DemandepretComponent } from './demandepret/demandepret.component';
import { GestionreportingComponent } from './gestionreporting/gestionreporting.component';
import { SoldecompteComponent } from './soldecompte/soldecompte.component';
import { ImpressionComponent } from './impression/impression.component';
import { PostcashComponent } from './postcash/postcash.component';
import { LoaderComponent } from './loader/loader.component';
import { ExpressoComponent } from './expresso/expresso.component';
import { TntComponent, DataToArray } from './tnt/tnt.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { EspacePersoComponent } from './espace-perso/espace-perso.component';
import { ComptabiliteComponent } from './comptabilite/comptabilite.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { panierComponent } from './panier/panier.component';
import { SenelecComponent } from './senelec/senelec.component';
import { OoluComponent } from './oolu/oolu.component';
import { TigoComponent } from './tigo/tigo-component.component';


/*-----------------*/
/*      Pipes      */
/*-----------------*/
import { DatafilterPipe } from './pipes/datafilter.pipe';
import { DecodatafilterPipe } from './pipes/decodatafilter.pipe';
import { CarddatafilterPipe } from './pipes/carddatafilter.pipe';
import { FiltrerecouvrementPipe } from './pipes/filtrerecouvrement.pipe';
import { FiltrerecommandearecupPipe } from './pipes/filtrerecommandearecup.pipe';
import { FiltrerecommandealivrerPipe } from './pipes/filtrerecommandealivrer.pipe';
import { PipeCommandePipe } from './pipes/pipe-commande.pipe';
import { FiltreoperateursPipe } from './pipes/filtreoperateurs.pipe';
import { FiltrervoperateursPipe } from './pipes/filtrervoperateurs.pipe';
import { AdminpdvgestionnaireservicePipe } from './gestionnaire/gestionnaire.pipe';


import { AdminpdvparametrecomptePipe } from './adminpdv/adminpdv-parametre-compte/adminpdv-parametre-compte.pipe';
import { AdminpdvStatusReclamationPipe } from './adminpdv/adminpdv-status-reclamation/adminpdv-status-reclamation.pipe';

import { AdminmultipdvStatusReclamationPipe } from './admin-multi-pdv/admin-multi-pdv-status-reclamation/admin-multi-pdv-status-reclamation.pipe';
import { AdminmultipdvUpdateCautionPipe } from './admin-multi-pdv/admin-multi-pdv-update-caution/admin-multi-pdv-update-caution.pipe';
import { AdminmultipdvDemandeRetraitPipe } from './admin-multi-pdv/admin-multi-pdv-demande-retrait/admin-multi-pdv-demande-retrait.pipe';

import { FilterAdminmultperformancePipe } from './pipes/filterAdminmultperformance.pipe';
import { FiltredateintervallePipe } from './pipes/filtredateintervalle.pipe';
import { FiltredateparanneePipe } from './pipes/filtredateparannee.pipe';
import { FiltredateparjourPipe } from './pipes/filtredateparjour.pipe';
import { FiltrefichierPipe } from './pipes/filtrefichier.pipe';
import { FiltrervPipe } from './pipes/filtrerv.pipe';
import { FiltrechargesPipe } from './pipes/filtrecharges.pipe';
import { FiltrerevenusPipe } from './pipes/filtrerevenus.pipe';
import { FiltreexploitationPipe } from './pipes/filtreexploitation.pipe';
import { FiltresupservicePipe } from './pipes/filtresupservice.pipe';
import { FiltreportefeuillePipe } from './pipes/filtreportefeuille.pipe';
import { FiltrerelancePipe } from './pipes/filtrerelance.pipe';
import { FiltrepromotionPipe } from './pipes/filtrepromotion.pipe';
import { FiltreprospectionPipe } from './pipes/filtreprospection.pipe';
import { FiltresuivicommandePipe } from './pipes/filtresuivicommande.pipe';
import { FiltregestionreportingPipe } from './pipes/filtregestionreporting.pipe';
import { SelfprovidedfilterPipe } from './pipes/selfprovidedfilter.pipe';
import { ConsulterpretComponent } from './consulterpret/consulterpret.component';
import { SuppliedarticlesPipe } from './pipes/suppliedarticles.pipe';
import { FiltrezonepdrPipe } from './pipes/filtrezonepdr.pipe';
import { FiltresouszonepdrPipe } from './pipes/filtresouszonepdr.pipe';
import { FiltresouszonesupplierPipe } from './pipes/filtresouszonesupplier.pipe';
import { FiltrezonesupplierPipe } from './pipes/filtrezonesupplier.pipe';
import { FiltrecataloguecommandePipe } from './pipes/filtrecataloguecommande.pipe';
import { FirstlogComponent } from './firstlog/firstlog.component';
import {FiltreexploitationaveccommissionPipe} from "./pipes/filtreexploitationaveccommission.pipe";
import {GuideUserCaisseComponent} from "./guideusercaisse/guideusercaisse.component";
import {GuideUserSuperviseurComponent} from "./guideusersuperviseur/guideusersuperviseur.component";
import {WizallComponent } from './wizall/wizall.component';
import {UtilsService} from "./services/utils.service";
import {CrmService} from "./services/crm.service";
import {AdminpdvService} from "./services/adminpdv.service";
import {ImpressionadminpdvComponent} from "./impressionadminpdv/impressionadminpdv.component";
import {CommissionnementComponent } from './commissionnement/commissionnement.component';
import {ChallengeresultsComponent } from './challengeresults/challengeresults.component';
import {AdminmultipdvCreditationCCComponent} from "./admin-multi-pdv/admin-multi-pdv-creditation-cc/admin-multi-pdv-creditation-cc.component";

import { ZoningComponent } from './zoning/zoning.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { AnnoncesuperviseurComponent } from './annoncesuperviseur/annoncesuperviseur.component';

import { SdeComponent } from './sde/sde.component';
import { WoyofalComponent } from './woyofal/woyofal.component';

import {AdminmultipdvSuivipointComponent} from "./admin-multi-pdv/admin-multi-pdv-suivipoint/admin-multi-pdv-suivipoint.component";
import {AuthService} from "./services/auth.service";
import {ComptabiliteService} from "./services/comptabilite.service";
import {AdminmultipdvService} from "./services/adminmultipdv.service";
import {TntService} from "./services/tnt.service";
import {PostCashService} from "./services/postcash.service";
import {AuthenticationService} from "./services/authentification.service";
import {GestionreportingService} from "./services/gestionreporting.service";
import {DemandepretService} from "./services/demandepret.service";
import {EcomService} from "./services/ecom.service";
import {WizallService} from "./services/wizall.service";
import {FacturierService} from "./services/facturier.service";
import {OrangemoneyService} from "./services/orangemoney.service";
import {ExpressocashService} from "./services/expressocash.service";
import {MapsService} from "./services/maps.service";
import {TarifsService} from "./services/tarifs.service";
import {WariService} from "./services/wari.service";

import { NewAnfantComponent } from './new-anfant/new-anfant.component';

import { EncoureComponent } from './encoure/encoure.component';
import { WariComponent } from './wari/wari.component';
import { AirtimeComponent } from './airtime/airtime/airtime.component';
import { CanalComponent } from './canal/canal.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { ZuuluComponent } from './zuulu/zuulu.component';
import { ZuuluService } from './services/zuulu.service';
import { CanalService } from './services/canal.service';



/*--------------------------------------------------------------------------------------------------------*/
/*                                            END OF IMPORTS                                              */
/*--------------------------------------------------------------------------------------------------------*/


@NgModule({
  declarations: [
    DataToArray,
    AppComponent,
    AuthComponentComponent,
    AccueilComponent,
    OrangeMoneyComponentComponent,
    TigoCashComponentComponent,
    TigoComponent,
    CrmComponent,
    DashboardComponent,
    ECommerceComponent,
    AccueiladminpdvComponent,
    AccueilAdminMultiPdvComponent,
    DemandepretComponent,
    GestionreportingComponent,
    SoldecompteComponent,
    panierComponent,
    RapidoComponent,
    SdeComponent,
    WoyofalComponent,
    SenelecComponent,
    OoluComponent,

    ImpressionComponent,
    ImpressionadminpdvComponent,

    PostcashComponent,

    AdminmultipdvDashboardComponent,
    AdminmultipdvDemandeRetraitComponent,
    AdminmultipdvMonitoringComponent,
    AdminmultipdvStatusPdvComponent,
    AdminmultipdvStatusReclamationComponent,
    AdminmultipdvUpdateCautionComponent,
    AdminmultipdvCreditationCCComponent,

    AdminpdvAidedecisionComponent,
    AdminpdvDashboardComponent,
    AdminpdvMonitoringComponent,
    AdminpdvStatusReclamationComponent,
    AdminpdvparametrecompteComponent,

    LoaderComponent,
    NavbarTopComponent,
    ExpressoComponent,
    TntComponent,
    CatalogueComponent,
    EspacePersoComponent,
    LoaderComponent,
    ComptabiliteComponent,
    DatafilterPipe,
    DecodatafilterPipe,
    CarddatafilterPipe,
    FiltrerecouvrementPipe,
    FiltrerecommandearecupPipe,
    FiltrerecommandealivrerPipe,
    PipeCommandePipe,
    FiltreoperateursPipe,
    FiltrervoperateursPipe,
    FiltredateintervallePipe,
    FiltredateparjourPipe,
    FiltredateparanneePipe,
    FilterAdminmultperformancePipe,
    FiltrecataloguecommandePipe,

    AdminmultipdvStatusReclamationPipe,
    AdminmultipdvUpdateCautionPipe,
    AdminmultipdvDemandeRetraitPipe,
    AdminmultipdvSuivipointComponent,
    AdminpdvparametrecomptePipe,
    AdminpdvStatusReclamationPipe,
    AdminpdvgestionnaireservicePipe,

    FiltrefichierPipe,
    FiltrervPipe,
    FiltrechargesPipe,
    FiltrerevenusPipe,
    FiltreexploitationPipe,
    FiltreexploitationaveccommissionPipe,
    FiltresupservicePipe,
    FiltreportefeuillePipe,
    FiltrerelancePipe,
    FiltrepromotionPipe,
    FiltreprospectionPipe,
    FiltresuivicommandePipe,
    FiltregestionreportingPipe,
    SelfprovidedfilterPipe,
    ConsulterpretComponent,
    SuppliedarticlesPipe,
    FiltrezonepdrPipe,
    FiltresouszonepdrPipe,
    FiltresouszonesupplierPipe,
    FiltrezonesupplierPipe,
    FirstlogComponent,
    GestionnaireComponent,
    GuideUserCaisseComponent,
    GuideUserSuperviseurComponent,
    WizallComponent,
    CommissionnementComponent,
    ChallengeresultsComponent,
    ZoningComponent,
    AnnoncesComponent,
    AnnoncesuperviseurComponent,
    NewAnfantComponent,
    EncoureComponent,
    WariComponent,
    AirtimeComponent,
    CanalComponent,
    AssuranceComponent,
    ZuuluComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    DataTableModule,
    ChartsModule,
    LoadersCssModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ProgressbarModule.forRoot(),
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
      EFinancierService,
      LAbonnementService,
      NAbonnementService,
      MyAccountService,
      AgentTopUpService,
      CashOutService,
      CashInService,
      SoldeService,
      RetraitEspeceService,
      AchatCreditTelService,
      RechargeEspeceService,
      AchatCodeWoyofalService,
      ReglSenelecService,
      AchatJulaService,
      AuthGuard,
      AuthGuardcais,
      AuthGuardsup,
    AuthenticationService,
    AdminpdvService,
    AdminmultipdvService,
    UtilsService,
    TntService,
    PostCashService,
    AuthService,
    ComptabiliteService,
    CrmService,
    GestionreportingService,
    EcomService,
    DemandepretService,
    WizallService,
    FacturierService,
    OrangemoneyService,
    TigocashService,
    ExpressocashService,
    MapsService,
    WariService,
    TarifsService,
    AirtimeService,
    ZuuluService,

    CanalService,

    ControleService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
