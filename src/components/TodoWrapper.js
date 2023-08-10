import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

/*
    Todo EditTodoForm ve TodoForm componentlerini içerir
    yeni yapılacakları eklemek, düzenlemek, silmek ve tamamlandı
    olarak göstermek
*/

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]); // todos state i yapılacakları saklar ve bunu useState hooku ile yönetir. Başlangıçta boş bir yapılacaklar listesi ile başlaması için useState([])

  const addTodo = (todo) => { // bir yapılacak öğesini (todo parametresi) todos durumuna eklemek için
    setTodos([
      ...todos, // yayılma operatörü ile mevcut dizi kopyalanır
      { id: uuidv4(), task: todo, completed: false, isEditing: false }, // yeni yapılacak öğesini temsil eden nesne oluşturulur
      // oluşan nesne id, yapılacak öğesinin metni (task), tamamlanma durumunu (completed) ve düzenlemede olup olmadığını (isEiting) belirtir 
      // uuidv() fonksiyonu ile oluşturulan benzersiz bir id verdik
    ]);
  }


  // yapılcak öğesini silmek için kullanılan fonksiyon
  // silincek öğenin idsini parametre olarak alıyoruz
  const deleteTodo = (id) => 
    setTodos(todos.filter((todo) => todo.id !== id));
    /*
      todos dizisi döngüyle dolaşılır ve her bir yapılcak öğesi kontrol edilir
      id değeri eşit olmayan yapılacakları filtreler
      filtrelenen yapılcak öğelerinden oluşan yeni diziyi todosa atar
      silinmek istenen diziden kaldırılmış olur
    */


  // tamamlanmış - tamamlanmamış olarak işaretlenmesi için kullanılır
  const toggleComplete = (id) => {
    setTodos( // mevcut todos durumunu günceller
      todos.map((todo) => // güncellenen durum map fonksiyonuyla döngülenerek oluşturuluyor
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        /*
          her yapılcak öğesi kontrol edilir
          id değeri eşitse yapılcak öğesinin completed özelliği tersine çevrilir
          tamamlanmış ise tamamlanmamış tamamlanmammış ise tamamklanmış (true-false)
          aynı yapılcak öğenin diğer özellikleri (id, task, isEditing) aynen kopyalanır
          : todo bu kısım eğer yapılcak öğenin idsi id parametresi ile verilen değere eşit değilse yapılacak öğesi olduğu gibi bırakılır
        */
      )
    );
  }


  // düzenleme moduna geçirmek ya da düzenleme modundan çıkmak için kullanılan fonksiyon
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
      /*
        her bir yapılcak öğesine erişiliyor
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo bu kısım eğer id uyuyorsa
        yapılacak öğesinin isEiting özelliği tersine çevrilir (!todo.isEditing). Yani düzenleme modundaysa
        düzenleme modu kapatılır ya da tam tersi. Geri kalan özellikleri aynen kopyalanır.
        : todo bu kısım eğer yapılcak öğenin idsi id parametresi ile verilen değere eşit değilse yapılacak öğesi olduğu gibi bırakılır
      */
    );
  }

  const editTask = (task, id) => { // task (güncellenen yapılacak öğesinin yeni metni) ve id parametrelerini alır
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
      /*
        her yapılcak öğesi map ile döngü şeklinde gezilir id değeri id parametresine eşit ise
        yapılacak öğesinin isEditing ve task özelliği değiştirilir eğer id değeri eşit
        değilse yapılacak öğesi olduğu gibi bırakılır
      */
    );
  };
  return (
    <div className="TodoWrapper">
      <h1>Yapılacaklar Listesi</h1>
      <TodoForm addTodo={addTodo} /> {/* addTodo propu. Yeni yapılacak öğeleri eklemek için bir form alanı sağlar */}
      
      {/*
        dizi üzerinde bir döngü yapılır her bir yapılacak öğesi için bir bileşen oluşturulur
        
        todo.isEditing ? (...) : (...) yani isEditing değeri true ise düzenleme modunda olduğunu 
        gösteren EditTodoForm bileşeni oluşturulur false ise normal görünümde olan Todo bileşeni oluşturulur.

        <EditTodoForm editTodo={editTask} task={todo} />
        düzenleme modunda olan yapılacak öğesini düzenlemek için kullanılan EditTodoForm bileşeni çağrılır
        editTodo propu editTask fonksiyonunu tetikler yapılcak öğesi güncellenir task düzenlenecek yapılacak öğesini temsil ediyor
      */}
      
      {todos.map((todo) => 
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo key={todo.id} task={todo}
            deleteTodo={deleteTodo} editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  )
}
