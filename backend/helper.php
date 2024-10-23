<?php


function getPronoun($gender){
    return match ($gender) {
        'Female' => 'Ms.',
        'Male' => 'Mr.',
        default => null
    };

}

function getAdviser($gender, $lname, $fname){
    if(!is_null($gender) && !is_null($lname) && !is_null($fname)){
        return getPronoun($gender) . ' ' . $fname . ' ' . $lname;
    }
    else{
        return 'No Adviser Assigned';
    }
}