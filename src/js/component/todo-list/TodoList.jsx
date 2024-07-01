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
					return(<li key={task.id} className="list-group-item text-light myTask p-3 mb-3 bg-dark rounded-pill">
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