function userValidation(id:string,pin:number ):void{
    const regex=/^[a-zA-Z]+$/;
    if (!id.match(regex)) throw { TypeError:'Type of Id must be string'}
    if (typeof pin !=='number') throw { TypeError:'Type of Pin must be number'}
    const pinLen= Math.ceil(Math.log10(pin )) 
    if (pinLen!==4) throw { PinError:'Pin length should be 4'}      
}

function userAmountValidation(amount:number,balance?:number){
    if (!amount) throw {AmountError: 'Amount should be provided'}
    if( Number.isNaN(amount)) throw {TypeError: 'Amount should be Number'}
    if (amount % 500!==0  ) throw {AmountError: 'Amount should be multiple of 500s'}
    if (amount < 500) throw {AmountError: 'Amount should be equal to or greater than 500'} 
    if (balance){
        if (amount > balance!) throw {Error:4520 , desc: 'Not Enough Balance.'};
    }
}

export default {userValidation,userAmountValidation}
