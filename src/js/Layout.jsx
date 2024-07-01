import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TodoList from "./component/todo-list/TodoList";
import { faICursor } from '@fortawesome/free-solid-svg-icons';


const initialTasks = {
    'label': '',
    is_done: false
}

const BASE_URL = 'https://playground.4geeks.com/todo'

//create your first component
const Layout = () => {

	 const [tasks, setTasks] = useState(initialTasks);
	 const [todos, settodos ] = useState([]);
 
	 const handleInputChange = ({target}) => {
		 setTasks({
			...tasks,
			[target.name]: target.value
		 });
	 };

     const addTask = async (event) =>{
        try {
            if(event.key === 'Enter'){
                if(tasks.label.trim() !== ""){
                    const responde = await fetch(`${BASE_URL}/todos/danielBayona`,{
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(tasks)
                    })
                    if(responde.ok){
                        getAllTasks();
                        setTasks(initialTasks);
                    } else{
                        console.log("No found");
                    }
                }
            }
            
        } catch (error) {
            console.log(error);
        }
     }

     const getAllTasks = async () =>{
        try {
            let responde = await fetch(`${BASE_URL}/users/danielBayona`)
            let data = await responde.json();

            if(responde.status === 404){
                createUser()
                getAllTasks();
            } else{
                settodos(data.todos)
            }
        } catch (error) {
            console.log(error);
        }
     }

     const createUser = async () =>{
        try {
            let responde = await fetch(`${BASE_URL}/users/danielBayona`,{
                method: "POST"
            })
            console.log(responde);
        } catch (error) {
            console.log(error);
        }
     }
 
	 const removeTask = (id) => {
		 fetch(`${BASE_URL}/todos/${id}`,{
            method: "DELETE"
         })
         .then((responde) => getAllTasks())
         .catch((error) => console.log(error));
	 };

     const removeAllTasks = async () => {
        try {
            let responde = await fetch(`${BASE_URL}/users/danielBayona`,{
                method: "DELETE"
            })
            if (responde.status === 204) {
                getAllTasks();
            }

            
        } catch (error) {
            console.log(error);
        }
     }

    useEffect(() =>{
        getAllTasks()
    },[])

	return (
		<>
			<div className="container">
				<div className="tittle">
				<h1>Your Todo List</h1>
				<h2>{`You have: ${todos.length} tasks left`}</h2>
				</div>
				<div className="myForm col-sm-2 justify-content-center mb-4">
				<form className="p-3 rounded-start col-lg-12 col-sm-4 col-md-8" onSubmit={(event) => event.preventDefault()}>
					<div className="input-group inputStyle">
					<input 
					type="text"
					className="form-control bg-dark text-light"
					id="textList"
					name="label"
					value = {tasks.label}
					onChange={handleInputChange}
                    onKeyDown={addTask}
					placeholder="What needs to be done?"
					/>
					<span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faICursor} /></span>
					</div>
				</form>
				</div>
					<TodoList tasks={todos} removeTask={removeTask} />
                    <button className="btn bg-dark mt-3 text-light rounded-pill" onClick={() => {removeAllTasks()}}>Delete all Tasks</button>
			</div>
		</>
	);
};

export default Layout;
