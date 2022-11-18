import { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

const Statistic = (props) => {
  
  const sum = props.good + props.neutral + props.bad
  if (sum === 0){
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (<div>
            <h1>statistic</h1>
            <table>
              <tbody>
                <StatisticLine text="good" value={props.good} /> 
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="average" value={(props.good - props.bad) / (sum)} />
                <StatisticLine text="positive" value={(props.good / (sum))*100} />
              </tbody>
            </table>
        </div>
      )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handler={() => setGood(good + 1)} text="good" />
        <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handler={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistic 
        good={good} 
        neutral={neutral} 
        bad={bad}>        
      </Statistic>
      
    </div>
  )
}

export default App