import './styles.css'
import {useState} from "react"

const App = () => {
  const [records,setRecords] = useState([
    {
      amount: "10000",
      category: "Salary",
      date: "2021-04-30",
      expense: false,
      income: true
    },{
      amount: "1000",
      category: "Rent",
      date: "2021-05-01",
      expense: true,
      income: false
    }
  ])
  const [showAddLayout, setShowAddLayout] = useState(false)
  const [state, setState] = useState({
    addIncome : false,
    addExpense : false
  })
  const [record, setRecord] = useState({
    income : false,
    expense : false,
    date : "",
    category : "",
    amount : "",
  })
  const addRecord = (e) => {
    const {value} = e.target
    if(!showAddLayout) setShowAddLayout(true)
    setRecord({
        date : "",
        category : "",
        amount : ""
      })

    if(value === "addIncome") {
      if(state.addIncome == true){
        handleReset()
      } else {
        setState({
          addIncome : true,
          addExpense : false
        })}
      }
      
    if(value === "addExpense") {
      if(state.addExpense ==  true){
        handleReset()
      } else {
        setState({
          addIncome : false,
          addExpense : true
        })}
      }
      
  }
  const handleChange = (e) => {
    setRecord(prevState => {
      return {
        ...prevState,
        [e.target.name] : e.target.value
      }
    })
  }
  const handleSubmit = (e) => {
    if(state.addIncome){
      setRecord(prevState=>{
        prevState.income = true
        prevState.expense = false
        return prevState
      })
    }
    if(state.addExpense){
      setRecord(prevState=>{
        prevState.expense = true
        prevState.income = false
        return prevState
      })
    }
    const result = records
    result.push(record)
    setRecords(result)
    console.log(records)
    
    handleReset()
  }
  const handleReset = () => {
    setRecord({
      date : "",
      category : "",
      amount : ""
    })
    setState({
      addIncome : false,
      addExpense : false
    })
    setShowAddLayout(false)
  }

  const deleteRecord = (obj) => {
    const arr = records
    const result = []
    for(let i = 0; i < arr.length; i++){
      if(arr[i].amount !== obj.amount && arr[i].category !== obj.category &&
        arr[i].date !== obj.date && arr[i].expense !== obj.expense && arr[i].income !== obj.income
        ){
          result.push(arr[i])
        }
    }
    setRecords(result)
  }

  const displayTotal = () => {
    let income = 0
    for(let i = 0; i < records.length; i++){
      if(records[i].income){
        income += parseFloat(records[i].amount)
      }
    }
    let expenses = 0
    for(let i = 0; i < records.length; i++){
      if(records[i].expense){
        expenses += parseFloat(records[i].amount)
      }
    }
    return [income-expenses , expenses]
  }

  return (
    <div className="card">
      <h3>Expense Tracker</h3>
      
      <div className="incomeExpense">
        <div className="balance">
          <h4
            style={{
              margin: "0 0 10px 0"
            }}
          >Total Balance</h4>
          <h4>{displayTotal()[0]}</h4>
        </div>
        <div className="expense">
          <h4
            style={{
              margin: "0 0 10px 0"
            }}
          >Total Expenses</h4>
          <h4>{displayTotal()[1]}</h4>
        </div>
      </div>

      <div>
        <div className="btnLayout">
          <button className="addRecord" value="addIncome" onClick={addRecord}>Add Income</button>
          <button className="addRecord" value="addExpense" onClick={addRecord}>Add Expense</button>
        </div>

        <div className="addLayout" style={{display:!showAddLayout?"none":""}}>
          <h4>Add {state.addIncome ? "Income" : "Expense"}</h4>
          <label>Type of {state.addIncome ? "Income" : "Expense"}</label>
          <input type = "text"          
                placeholder = "Category"
                name = "category"
                value = {record.category}
                onChange = {handleChange}
          />
          <label>Amount</label>
          <input type = "number" 
                placeholder = "Amount"
                name = "amount"
                value = {record.amount}
                onChange = {handleChange}
          />
          <label>Date</label>
          <input type = "date"
                name = "date"
                value = {record.date}
                onChange = {handleChange}/>

          <button
            onClick = {handleSubmit}
            className = 'submit'
          >Submit</button>
          <button
            onClick = {handleReset}
            className = 'cancel'
          >Cancel</button>
        </div>
      </div>
      <div className="displayIncomeExpense">
      <h4>{records && "Income/Expenses"}</h4>
        {
          records.map((x,i)=>{
            return (
              <div key={x.date}>
              <div className={x.income?"in" : "out"}>
                <ul>
                  <li><span className = 'delBtn'
                    onClick = {()=>{
                      deleteRecord(x)
                    }}
                  >🚮 </span>{x.category}
                  </li>
                  <li>{x.amount}</li>
                </ul>
                <p>{x.date}</p>
              </div>
              <hr />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App