import React from "react";
import { useState } from "react";
import { incomeCalc } from "./incomeCalc";
import { userCategories } from "./govTables.js";
import { Button } from "@material-ui/core";


export function Form(props) {
  const { setResult } = props;
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourRate, setHourRate] = useState("");
  const [userCategory, setUserCategory] = useState("");
  const [partnerIncome, setPartnerIncome] = useState("");
  const [timePeriod, setTimePeriod] = useState("weekly");

  const hiddenField = document.getElementById("hiddenInput");
  const selectField = document.getElementById("selectField");

  const hoursWorkWarning = document.getElementById("hoursWorkWarning");
  let hoursWorkBool = false;
  const hourRateWarning = document.getElementById("hourRateWarning");
  let hourRateBool = false;
  const userCategoryWarning = document.getElementById("userCategoryWarning");
  let userCategoryWarningBool = false;
  const partnerIncomeWarning = document.getElementById("partnerIncomeWarning");
  let partnerIncomeWarningBool = true;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    // validation for the hours worked input
    if(hoursWorked < 1){
        hoursWorkWarning.style.display = "block";
        hoursWorkBool = false;
      } else{
        hoursWorkWarning.style.display = "none";
        hoursWorkBool = true;
      }

    // validation for the hours rate input
      if(hourRate < 1){
        hourRateWarning.style.display = "block";
        hourRateBool = false;
      } else{
        hourRateWarning.style.display = "none";
        hourRateBool = true;
      }
      
      // validation for the user category
      const userCatValus = [0, 1, 2, 3, 4, 5, 6];

      if(!userCatValus.includes(userCategory)){
        userCategoryWarning.style.display = "block";
        userCategoryWarningBool = false;
      } else{
        userCategoryWarning.style.display = "none";
        userCategoryWarningBool = true;
      }

      // validation for the partner income 
       if(userCategory === 5 || userCategory === 6){
         partnerIncomeWarningBool = false;
         if(partnerIncome < 1){
            partnerIncomeWarning.style.display = "block";
            partnerIncomeWarningBool = false;
         }else{
            partnerIncomeWarning.style.display = "none";
            partnerIncomeWarningBool = true;
         }
       }

    //check if all the required fields are vilid before strating the calculation
    if(hoursWorkBool && hourRateBool && userCategoryWarningBool && partnerIncomeWarningBool){
        const finalCalc = incomeCalc(
            hourRate,
            hoursWorked,
            userCategories[userCategory],
            partnerIncome,
            timePeriod
          );
          
          setResult(finalCalc);
    }
     
  };

  // function to reset the form's fields
  const formReset = () => {
    // reset fields
    setUserCategory("");
    setHoursWorked("");
    setHourRate("");
    setPartnerIncome("");
    setTimePeriod("weekly");

    // reset the warning spans 
    hoursWorkWarning.style.display = "none";
    hourRateWarning.style.display = "none";
    userCategoryWarning.style.display = "none";
    partnerIncomeWarning.style.display = "none";
    hiddenField.style.display = "none";

    // reset the result's values
    let resetValues = { 
        workHours: 0,
        workIncomeTotal: 0,
        maxGovPayment: 0,
        deductions: 0,
        finalGovPay: 0,
        totalIncome: 0
    }
      
      setResult(resetValues);
  }

  // function to show the Partner income field when one of the partner options are selected
  const ShowHideDiv = () => {
    if (selectField.value === "5" || selectField.value === "6") {
      hiddenField.style.display = "block";
    } else {
      hiddenField.style.display = "none";
    }
  };

  return (
    <div className="form">
    <form onSubmit={handleSubmit} id="userForm" >
      <div>
      <h2 className="_titles"> INPUT </h2>
        <label>
          Time Period:
          <select
                id="time_period"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}>
             
            <option value="weekly"> Weekly </option>
            <option value="fortnightly"> Fortnightly </option>
            <option value="monthly"> Monthly </option>
          </select>
          </label>
         
        <label>
          Hours Worked :
          <input
            id="hoursWork"
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            placeholder="e.g. 20"
            required
          />
          
        </label>
        <span id="hoursWorkWarning" className="validation" style={{ display: "none" }}>Please insert a positive number.</span>

        <label>
          Hourly Rate :
          <input
            type="number"
            value={hourRate}
            onChange={(e) => setHourRate(e.target.value)}
            placeholder="e.g. 20.33"
            required
          />
         
        </label>
        <span id="hourRateWarning" className="validation" style={{ display: "none" }}>Please insert a positive number.</span>

        <div id="hiddenInput" style={{ display: "none" }}>
          <label>
            Partners Income:
            <input type="number" 
              value={partnerIncome}
              onChange={(e) => setPartnerIncome(e.target.value)}
              placeholder="e.g. 20"
             />
          </label>
          <span id="partnerIncomeWarning" className="validation" style={{ display: "none" }}>Please insert a positive number.</span>
        </div>

        <label>
          User Category:
          <select
            id="selectField"
            value={userCategory}
            onChange={(e) => {
              setUserCategory(Number(e.target.value));
              ShowHideDiv();
            }}
          >
            <option >Please select a category</option>
            <option value="0">Single, no children</option>
            <option value="1">
              Single, NOT the principal carer of a dependent child or children
            </option>
            <option value="2">
              Single, 60 or older, after 9 continuous months on payment
            </option>
            <option value="3">
              Single, principal carer of a dependent child or children
            </option>
            <option value="4">
              Single principal carer granted an exemption
            </option>
            <option value="5">Partnered</option>
            <option value="6">Partnered, Partner with pension</option>
          </select>
        </label>
        <span id="userCategoryWarning" className="validation" style={{ display: "none" }}>Please select a valid catgory.</span>
        <Button  type="submit" value="Submit" variant="contained">Calculate</Button>
        <Button variant="contained"
        // onClick={()=>{setHoursWorked("");
        //                       setHourRate("");
        //                       setPartnerIncome("");
        //                       setUserCategory("");
        //                       setTimePeriod("");}}>Reset</Button>

        onClick={formReset}>Reset</Button>
       
      </div>
    </form>
    </div>
  );
}

export default Form;
