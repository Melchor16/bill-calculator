const d = document, w = window;
const $number_inputs = d.querySelectorAll('input[type="number"]'),
$radio_inputs = d.querySelectorAll('input[type="radio"]'),
$bill = d.getElementById('bill'),
$custom_tip = d.getElementById('custom_tip'),
$ppl = d.getElementById('people'),
$error = d.getElementById('error'),
$total_tip = d.getElementById('total_tip'),
$total_bill = d.getElementById('total_bill'),
$reset = d.getElementById('reset');

let bill = 0,
tip_percentage = 0,
ppl = 0,
total_bill = 0,
total_tip = 0;

//-----ERROR FUNCTIONS-----//
function errorOn(){
    $error.classList.remove('hidden');
    $ppl.classList.add('error_ppl');
}

function errorOff(){
    $error.classList.add('hidden');
    $ppl.classList.remove('error_ppl');
}

//-----RESULT FUNCTION-----//
function result(){
    $reset.classList.remove('reset_inactive');
    total_tip = (bill * tip_percentage)/ppl;
    total_bill = (bill/ppl) + total_tip;

    $total_tip.innerHTML=`$${total_tip.toFixed(2)}`;
    $total_bill.innerHTML=`$${total_bill.toFixed(2)}`;
}

//-----MAIN PROGRAM-----//
for(let inputs of $radio_inputs){
    inputs.onclick=e=>{
        $reset.classList.remove('reset_inactive');
        tip_percentage = Number(inputs.value);
        $custom_tip.value=''    //erase the custom tip when radio is selected
        if($ppl.value==='' || $ppl.value === '0'){
            errorOn();
        }else{
            errorOff();
            result();
        }
    }
}

$bill.addEventListener('change', e=>{
    $reset.classList.remove('reset_inactive');
    bill = Number($bill.value);
    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        result();
    }
})

$ppl.addEventListener('change', e=>{
    $reset.classList.remove('reset_inactive');
    ppl = Number($ppl.value);
    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        result();
    }
})

$custom_tip.addEventListener('change', e=>{
    $reset.classList.remove('reset_inactive');
    tip_percentage = Number($custom_tip.value/100);
    for(let inputs2 of $radio_inputs){  //uncheck the radio inputs if you put a custom tip
        inputs2.checked = false;
    }

    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        result();
    }
})

//-----RESET-----//

$reset.addEventListener('click', e =>{
    $bill.value=''
    $custom_tip.value=''
    $ppl.value=''
    $total_bill.innerHTML='$0.00'
    $total_tip.innerHTML='$0.00'

    for(let inputs2 of $radio_inputs){
        inputs2.checked = false;
    }

    $reset.classList.add('reset_inactive')
})

