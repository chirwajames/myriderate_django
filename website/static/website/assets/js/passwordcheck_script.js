$(document).ready(function(){
let confirmPassword = document.querySelector('#confirmPassword');
    let passWord = document.querySelector('#passWord');
    let passwordAlert = document.querySelector('#passwordAlert');

    function checkPassword(){

        passwordAlert.innerText = passWord.value == confirmPassword.value ? '': 'Passwords not Matching, Please try again!';
    }
   passWord.addEventListener('keyup',()=>{

       if (confirmPassword.value.length != 0) checkPassword();
   })
    confirmPassword.addEventListener('keyup', checkPassword);
}); 