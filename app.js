//First Page 
let formDetails = [];
let detail1 = {};
let  formParams = ["control", "label", "validation"];
//validation of UI form 
$inputType = $('#inputType');
$boxList = $('.boxList');
$boxLabel = $('#boxLabel');
$addButton = $('#addInput');
$inputType.change(function(){
    if($inputType.children('option:selected').val() === 'Checkbox')
    {
        $boxList.css('display','block');
        $boxLabel.blur(function(){
            //clear all the inputs
            $('.boxInputs').remove();
            for(let i=0;i<$boxLabel.val();i++)
            {   ///create all input after all the box label
                $boxLabel.after(`<div class="boxInputs field">
                <label class="label">${i+1}</label>
                <input type="text" class="check input" />
                </div>`);
            }
        });
        
    }
    else{
        //clear the no of box field
        $boxList.css('display','none');
    }
});
//adding the input 
$addButton.click(function(){
    if($inputType.children('option:selected').val() === 'input-type')
    {
        alert('choose an input type');
    }
    
    if($('#labelText').val() === '')
    {
        alert($('#labelText').attr('name')+' cannot be blank');
    }  
    else
    {
        if($inputType.val() === 'Checkbox'){
            let label = {};
            //let labels = {};
            $('.check').each(function(index){
                label[`label${index}`] = $(this).val();
                detail1['box'] = label;
            });  
            console.log(formDetails);              
        }
        $('.imp').each(function(index){
           detail1[formParams[index]] = $(this).val();  
        });
        formDetails.push(detail1);
    }
      
});
$('#generateJson').click(function(){
    $('#json-code').val(JSON.stringify(formDetails)); 
    // $('.imp').each(function(){
    //     $(this).val('');
    //    });
});



//Second Page 
$('#designButton').click(function(){
   
    let detail = {};
    let $inputCode = $('#input-code').val();
    formDetails = JSON.parse($inputCode);
    $formResult = $('.formResult');
      
        $.each(formDetails, function(index){
          
            if(formDetails[index].control === 'Input')
            {                 
                $formResult.append(`<div class="field"><label class="label">${formDetails[index].label}</label><input type="text" class="input" validation-type="${formDetails[index].validation}"></div>`);
            }
            else if(formDetails[index].control === 'Number')
            {
                
                $formResult.append(`<div class="field"><label class="label">${formDetails[index].label}</label><input type="number" class="input" validation-type="${formDetails[index].validation}"></div>`);   
            }
           if(formDetails[index].control === 'Textarea')
            $formResult.append(`<div class="field"><label class="label">${formDetails[index].label}:</label><textarea class="input" rows=10 cols=30 placeholder = "${formDetails[index].label}" validation-type="${formDetails[index].validation}"></textarea></div>`);   
        });  
        
        //validation for blank
        $('.formResult .input').blur(function(){
            blankValidation($(this));
            
            if($(this).attr('validation-type') === 'number-validation'){
                numberValidation($(this));
            }
            if($(this).attr('validation-type')=== 'Email-validation'){
                emailValidation($(this))
            } 
            
        });

});


//validation for blank in form
function blankValidation($input){
    if($input.val() === '')
    {
        $input.css('border','5px solid #E98074');
    }
    else{
        $input.css('border','none');

    }
}

//validation for phone number
function numberValidation($input){
    if($input.val().length !=10 || $.isNumeric($input.val()) === false){
        $input.css('border','5px solid #E98074');
    }
    else
    {
        $input.css('border','none');
    }
}
function emailValidation($input){
        let emailid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!$input.val().match(emailid)) {
            $input.css('border','5px solid #E98074');
        } else {
            $input.css('border','none');
        }
}







