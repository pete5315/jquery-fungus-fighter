$(document).ready(onReady);

//initialize global variables
let fungusHP=100;
let yourAP=100;
let hp=0;
let ap=0;

function onReady() {
//add event listeners
    $('.attack-btn').on('click', attackBtn)
}

function attackBtn() {
    //get hp/ap values associated with the attack chosen
    if($(this).hasClass('arcane-scepter')) {
        fungusHP-=14;
        yourAP-=12;    
    };

    if($(this).hasClass('entangle')) {
        fungusHP-=9;
        yourAP-=23;
    };

    if($(this).hasClass('dragon-blade')) {
        fungusHP-=47;
        yourAP-=38;
    };

    if($(this).hasClass('star-fire')) {
        fungusHP-=25;
        yourAP-=33;    
    };

    // check if either global variables are 0
    if (fungusHP===0 || yourAP === 0) {
        return;
    }
    //add a floor at 0
    fungusHP=(fungusHP+Math.abs(fungusHP))/2;
    //add a floor at 0
    yourAP=(yourAP+Math.abs(yourAP))/2;
    //call the display update function
    updateDisplay();

}

function updateDisplay() {
    //update hp and ap on the DOM
    $('.hp-text').text(`${fungusHP} HP`)
    $('.ap-text').text(`${yourAP} AP`)

    //check if fungus is dead
    if(fungusHP===0) {
        $('.freaky-fungus').removeClass('walk').addClass('dead');
        $('.attack-btn').prop('disabled', true)
    }
    //check if humanity is doomed
    if(yourAP===0) {
        $('.freaky-fungus').removeClass('walk').addClass('jump');
        $('.attack-btn').prop('disabled', true)
    }
    //update the meters to match the amounts
    $('#hp-meter').val(`${fungusHP}`)
    $('#ap-meter').val(`${yourAP}`)
}

//runs regeneHP every 1000ms
setInterval(regenHP, 1000)

function regenHP() {
    //check if dead
    if(fungusHP<50 && fungusHP!==0) { //if not dead, check if hp<50
        //regen by 1  
        fungusHP+=1;
    }
    //update display
    updateDisplay();
}