import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => { 
  return (
    <div className="Todo">
        <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p> 
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} /> 
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
        </div>
    </div>
  )
}




/*
    kullanıcı icona tıkladığında ilgili işlev çağrılır
    yapılacak öğesinin metni task
    diğer proplar düzenleme, silme, tamamlama işlevleri

    deleteTodo propu silmek için kullanılır ve bunu id değerini kullanarak yapar
    editTodo propu yapılacak öğesini düzenlemek içindir ve yine idsini parametre olarak alır
    toggleComplete propu bir yapılcak öğesini yapıldı yapılmadı gibi işaretleme için kullanılan işlem yine idyi parametre alır
*/
// task, deleteTodo, editTodo, toggleComplete bu propları alır
/*task.task ifadesi yapılacak öğesinin metin içeriğini temsil ediyor*/
/*çağrılan yapılacak öğesinin idsi parametre olarak iletilir*/
/* p yapılacak öğesinin metnini ifade ediyor 
        {`${task.completed ? 'completed' : ""} ifadesi de yapılacak öğesi tamamlanmışsa complated sınıfını ekler
        ve yapılacak öğesini tıklanabilir hale getirmek için onClick toggleComplete işlevine bağlanır
         */