import { Injectable } from '@angular/core';

@Injectable()
export class ControleService {

  constructor() { }
  isNumber(num:string):boolean{
    let tab=["0","1","2","3","4","5","6","7","8","9"];
    for(let i=0;i<tab.length;i++){
      if(num===tab[i]){
        return true;
      }
    }
    return false;
  }

  verif_phone_number(number:string):boolean{
    let numero=number.split("");
    console.log(numero.length);
    if(numero.length!=parseInt("9")){
      return false;
    }
    for(let i=0;i<numero.length;i++){
      if(!this.isNumber(numero[i])){
        return false;
      }
    }
    return true;
  }

  verif_montant(mnt:string):boolean{
    if(parseInt(mnt)>=1){
      return true;
    }else{
      return false;
    }
  }
  verifRefClientSde(facture:string){
	let fact=facture.split("");
	if(fact.length!=12){
		return false;
	}else{
		
		for(let i=0;i<fact.length;i++){
		  if(!this.isNumber(fact[i])){
			return false;
		  }
        }
        return true;
	}
	
  }
  verifNumeroFactureSde(numero:string){
   let fact=numero.split("");
	if(fact.length!=23){
		return false;
	}else{
		
		for(let i=0;i<fact.length;i++){
		  if(!this.isNumber(fact[i])){
			return false;
		  }
        }
        return true;
	}
	
  }

}
