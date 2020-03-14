function eval() {
    // Do not use eval!!!
    return;
}

function isOperator(operator){
  if('*/+-()'.indexOf(operator) != -1){
    return true;
  }
  else
    return false; 
}

function priority(operator) {
  switch(operator){
    case('('): return 1;
    case(')'): return 1;
    case('+'): return 2;
    case('-'): return 2;
    case('*'): return 3;
    case('/'): return 3;
  }
}

function operation(operator, x, y){
  switch(operator){
    case('+'):  return y + x;
    case('-'):  return y - x;
    case('*'):  return y * x;
    case('/'): 
      if(x == 0)
        throw new Error("TypeError: Division by zero."); 
      else 
        return y / x;
  }
}


function check(expr) {
  let i = 0,
      state = 0,
      bracket = 0,
      arr = [],
      str = '';
  
  for(j = 0; j < expr.length; j++){
    if(parseInt(expr[j]) == expr[j]){
      str += expr[j];
      if(j == expr.length - 1){
        arr.push(str);
      }
    } 
    else if (isOperator(expr[j])){
      if(str != ''){
        arr.push(str);
        str = '';
      } 
      arr.push(expr[j]);
    }  
  }

  while(state != 3){
      switch(state){
        case(0): 
            if(i < arr.length - 1){  
              if(arr[i] == '('){
                i++;
                bracket++;
                state = 0;
              }
              if(parseInt(arr[i]) == arr[i]){    
                i++;
                state = 1;
              }
            }
            else 
              state = 2;
        break;
        case(1):
            if(i < arr.length - 1){
              if(arr[i] == ')'){
                bracket--;
                i++;
                state = 1;
                if(bracket < 0) {
                  return false;
                }    
              }
              else if(arr[i] == '+' || arr[i] == '-' || arr[i] == '/' || arr[i] == '*') {
                i++;
                state = 0;
              }
              else 
                return false;
            }
            else
              state = 2;
          break;
          case(2):
              if(arr[i] == ')') {
                bracket--;
              }
              if((arr[i] == ')' || parseInt(arr[i]) == arr[i]) && bracket == 0) {
                state = 3;
              }
              else {
                return false;
              }
          break;
        }
      }
  return true;
}
   
function toPostfix(expr) {
  let actionstack = [],
      resultstack = [],
      ex = expr.trim(),
      str = '';
  
  if(!check(ex)){
    throw new Error('ExpressionError: Brackets must be paired');
  }

  for(i = 0; i < ex.length; i++) {
    if(ex[i] == ' '){
      continue;
    }
    if(parseInt(ex[i]) == ex[i]) {
      str += ex[i];
      if(i == ex.length - 1){
          resultstack.push(str);
      }
    }
   
    else if(isOperator(ex[i])) {
      if(str != ''){
        resultstack.push(str);
        str = '';
      } 

      if(ex[i] == '(') 
        actionstack.push(ex[i]);
      
      else if(ex[i] == ')'){      
        while(actionstack[actionstack.length-1] != '(') {
          resultstack.push(actionstack.pop());
        }
        actionstack.pop();
      }
      else {
        if(actionstack.length != 0){
          while(priority(ex[i]) <= priority(actionstack[actionstack.length-1])){
            resultstack.push(actionstack.pop());  
          }
        }
        actionstack.push(ex[i]);       
      }
    }
  }
  while(actionstack.length != 0){
    resultstack.push(actionstack.pop());
  }
  return resultstack;
}

function counting(expr) {
  let stack = [];
  for(i = 0; i < expr.length; i++){
    if(expr[i] == '+' || expr[i] == '-' || expr[i] == '/' || expr[i] == '*') {
          stack.push(operation(expr[i], stack.pop(), stack.pop()));
      } else {
          stack.push(parseFloat(expr[i]));
    }
  }
  return stack.pop();
};

function expressionCalculator(expr){
  return counting(toPostfix(expr));
}

module.exports = {
    expressionCalculator
}