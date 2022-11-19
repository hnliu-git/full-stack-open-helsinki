const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
        <Part key={part.id} part={part} />
    )}      
  </>

const Course = ({course}) => {
    const sum = course.parts.reduce((pre, cur) =>
        pre + cur.exercises, 0
    )
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total sum={sum} />
        </>
    )
}


export default Course