const d = document, w = window;
const $number_inputs = d.querySelectorAll('input[type="number"]'),
$radio_inputs = d.querySelectorAll('input[type="radio"]'),
$bill = d.getElementById('bill'),
$custom_tip = d.getElementById('custom_tip'),
$ppl = d.getElementById('people'),
$error = d.getElementById('error'),
$total_tip = d.getElementById('total_tip'),
$total_bill = d.getElementById('total_bill');

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
    total_tip = (bill * tip_percentage)/ppl;
    total_bill = (bill/ppl) + total_tip;

    $total_tip.innerHTML=total_tip;
    $total_bill.innerHTML=total_bill;
}

//-----MAIN PROGRAM-----//
for(let inputs of $radio_inputs){
    inputs.onclick=e=>{
        $custom_tip.value=''
        if($ppl.value==='' || $ppl.value === '0'){
            errorOn();
        }else{
            errorOff();
            tip_percentage = Number(inputs.value);
            result();
        }
    }
}

$bill.addEventListener('change', e=>{
    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        bill = Number($bill.value);
        result();
    }
})

$ppl.addEventListener('change', e=>{
    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        ppl = Number($ppl.value);
        result();
    }
})

$custom_tip.addEventListener('change', e=>{
    for(let inputs2 of $radio_inputs){  //uncheck the radio inputs if you put a custom tip
        inputs2.checked = false;
    }

    if($ppl.value==='' || $ppl.value === '0'){
        errorOn();
    }else{
        errorOff();
        tip_percentage = Number($custom_tip.value);
        result();
    }
})

