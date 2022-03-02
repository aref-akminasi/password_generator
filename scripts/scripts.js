window.onload = function() {

    document.querySelector('#passwordrange').oninput = function() {
        let newValue =  document.getElementById('passwordrange').value;
        document.getElementById('passwordlength').innerHTML = "Password length: " + newValue;
        passwordLength = newValue;
        calcStrength();
        console.log(passwordLength);
    };
   
    const lowerCase = document.getElementById('lowercase');
    const upperCase = document.getElementById('uppercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');

   const lowerCaseSet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
   const upperCaseSet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
   const numbersSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
   const symbolsSet = ["!", "@", "#", "$", "%", "&", "?"];

   let password = "";
   let passwordLength = 10;
   let lowerCaseStatus = true;
   let upperCaseStatus = true;
   let numbersStatus = true;
   let symbolsStatus = true;
   let passwordStrength = 80;

   lowerCase.onchange = () => calcStrength();
   upperCase.onchange = () => calcStrength();
   numbers.onchange = () => calcStrength();
   symbols.onchange = () => calcStrength();

   document.getElementById('generatebutton').onclick = function() {
        if (lowerCase.checked) {
            lowerCaseStatus = true;
        } else {
            lowerCaseStatus = false;
        }

        if (upperCase.checked) {
            upperCaseStatus = true;
        } else {
            upperCaseStatus = false;
        }

        if (numbers.checked) {
            numbersStatus = true;
        } else {
            numbersStatus = false;
        }

        if (symbols.checked) {
            symbolsStatus = true;
        } else {
            symbolsStatus = false;
        }

        console.log(lowerCaseStatus);
        console.log(upperCaseStatus);
        console.log(numbersStatus);
        console.log(symbolsStatus);

        generatePassword();
        calcStrength();
        
   };


   function glowerCase(lowerCaseSet) {
    let index = Math.floor(Math.random() * (lowerCaseSet.length - 1));
    return(lowerCaseSet[index]);
   }

   function gupperCase(upperCaseSet) {
    let index = Math.floor(Math.random() * (upperCaseSet.length - 1));
    return(upperCaseSet[index]);
   }

   function gnumbers(numbersSet) {
    let index = Math.floor(Math.random() * (numbersSet.length - 1));
    return(numbersSet[index]);
   }

   function gsymbols(symbolsSet){
    let index = Math.floor(Math.random() * (symbolsSet.length - 1));
    return(symbolsSet[index]);

   }

   function generatePassword() {
       password = "";
       counter = 0;
       if(lowerCaseStatus == false && upperCaseStatus == false && numbersStatus == false && symbolsStatus == false) {
           document.getElementById('errorhandling').innerHTML = 'Please select at least one character set';
       } else {
        document.getElementById('errorhandling').innerHTML = '';
       while (counter < passwordLength) {
       if(counter < passwordLength && lowerCaseStatus == true) {
           password += glowerCase(lowerCaseSet);
           counter++;
       }

       if(counter < passwordLength &&  upperCaseStatus == true) {
        password += gupperCase(upperCaseSet);
        counter++;
    }

    if(counter < passwordLength && numbersStatus == true) {
        password += gnumbers(numbersSet);
        counter++;
    }

    if(counter < passwordLength && symbolsStatus == true) {
        password += gsymbols(symbolsSet);
        counter++;
    }
    }
       }



    
      document.getElementById('password').value = password;
   }


   function calcStrength() {
    if (lowerCase.checked) {
        lowerCaseStatus = true;
    } else {
        lowerCaseStatus = false;
    }

    if (upperCase.checked) {
        upperCaseStatus = true;
    } else {
        upperCaseStatus = false;
    }

    if (numbers.checked) {
        numbersStatus = true;
    } else {
        numbersStatus = false;
    }

    if (symbols.checked) {
        symbolsStatus = true;
    } else {
        symbolsStatus = false;
    }
       
       let lowerCaseFactor = 1;
       let upperCaseFactor = 1;
       let numbersFactor = 1;
       let symbolsFactor = 1;

       if (lowerCaseStatus) {
           lowerCaseFactor = 2
       } else {
        lowerCaseFactor = 1;
       }
       if (upperCaseStatus) {
           upperCaseFactor = 2;
       } else {
        upperCaseFactor = 1;
       }
       if (numbersStatus) {
        numbersFactor = 2;
       } else {
        numbersFactor = 1;
       }
       if (symbolsStatus) {
        symbolsFactor = 2;
       } else {
        symbolsFactor = 1;
       }
        
       passwordStrength = lowerCaseFactor * upperCaseFactor * numbersFactor * symbolsFactor * passwordLength;
       console.log(`pass strength is ${passwordStrength}`);
       if (passwordStrength <= 40) {
           passwordStrength = "Weak";
       }
       if (passwordStrength > 40 &&  passwordStrength < 96) {
           passwordStrength = "Medium";
       } if (passwordStrength >= 96) {
        passwordStrength = "Strong";
       }
       
       document.getElementById("passstrength").innerHTML = "Password strength: "+ passwordStrength;
   } 

   document.getElementById('copybutton').onclick = function() {
       
    document.getElementById('password').select();
    navigator.clipboard.writeText(document.getElementById('password').value);
    document.getElementById('errorhandling').innerHTML = 'Password copied!';
   };

};