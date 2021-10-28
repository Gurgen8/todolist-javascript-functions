//java-script   todo-APP

//ROOT
const root=document.getElementById('root')


//TOFO-FORM
function TodosForm (add){

    const container=document.createElement("form")
    container.innerHTML=`
    <input placeholder="add text" type="text" />
    <button>ADD </button>
    `
    container.addEventListener("submit",(e)=>{
        e.preventDefault()
        const value=container.querySelector("input").value
       add(value)
    })

    return container
}


//TODO-LIST
function ListItem(todo,onchange){
    const container=document.createElement("div")
    container.innerHTML=`
    <label>
    <input type="checkbox" ${todo.compleated?"checked":""}  />
    ${todo.label}
    </label>
    `
    const inp=container.querySelector("input")
    inp.addEventListener("change",(e)=>{
        e.preventDefault()
        onchange(e.target.checked)
    })

    return container

}


//TODO-LIST
function List( todos,onchange){
const container=document.createElement("div") 
todos.map(todo=>{
    return ListItem(todo,(change)=>{todo.compleated=change; onchange()})
}).forEach(el => {
    container.appendChild(el) 
});
return container
}


//footer-todo

function FooterTodo (todos,onchange){
    const container = document.createElement("div")
    const completed=todos.filter(todo=>todo.compleated===true).length
    container.innerHTML=`

    <span> ${completed}/${todos.length} </span>
    <button> clear completed </button>

    `
    const btn=container.querySelector("button")
    btn.addEventListener("click",()=>{
        onchange(todos.filter(todo=>todo.compleated===false))

    })

    return container
}



///Todo-app
function App(){
  const container=  document.createElement('div')
  let todos=[]
  function render(){
    container.innerHTML=""
    container.appendChild(TodosForm(function(newtext){
        todos.push({
            label:newtext,
            compleated:false
        })
        render()
    }))

    container.appendChild(List(todos,()=>{render()}))
    container.appendChild(FooterTodo(todos,(newtodo)=>{
        todos=newtodo
        render()
    }))
}
 render()
    

    return container
}




//render-browser
root.appendChild(App())