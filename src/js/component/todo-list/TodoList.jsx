import React from "react";
import "./TodoList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'; 



const TodoList = ({tasks,removeTask}) =>{

    return(
        <>
		<div className="myList">
			<ul className="list-group">
				{tasks.map((task)=>{
					return(<li key={task.id} className="liStyle list-group-item text-light myTask rounded bg-dark m-3 ">
						{task.label} 
					<button className="btn btn-secondary removeBtn" onClick={() => removeTask(task.id)}> 
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
					</li>
				)})}
			</ul>
		</div>
        </>
    );
}

export default TodoList;    