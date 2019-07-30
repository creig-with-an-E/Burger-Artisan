import React from 'react';

import classes from "./Input.module.css"
const input =(props)=>{
  const inputClasses = [classes.InputElement]
  let validationError = ""
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid)
    if(props.passwordConfirmField){
      //passsing different error message for password confirm field
      validationError =<p style={{color: "red"}}>Passwords do match</p>
    }else{
    validationError =<p style={{color: "red"}}>Please enter valid {props.elementConfig.type}</p>

    }
  }
  let inputElement = null
  switch(props.elementType){
    case "input":
      inputElement =<input className={inputClasses.join(" ")} 
              {...props.elementConfig} value={props.value} onChange={props.changed}/>
      break
    case "text-area":
      inputElement= <textArea className={inputClasses.join(" ")} {...props}  onChange={props.changed}/>
      break
    case "select":
      return inputElement = (<select className={inputClasses.join(" ")}
                    value={props.value} onChange={props.changed}>
                      {props.elementConfig.options.map(opt=>{
                          return <option  value={opt.value} key={opt.value}>{opt.displayValue}</option>
                      })}
                    </select>)
    default:
      inputElement= <input className={classes.InputElement} {...props}/>
  }
  return(
    <div className={classes.Input}>
      <label><span className={classes.Label}>{props.label}</span></label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input