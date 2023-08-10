import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

// yapılacakları yerel depolama kullanarak saklar 
// useEffect hookunu kullanarak bileşen yüklendiğinde 
// yerel depolamadan yapılacakları alır ve 
// localStorage.setItem işlevi kullanılarak yapılan değişiklikler 
// yerel depolamaya kaydedilir

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]) // başlangıçta yapılacaklar listesi boş dizi olarak tanımlandı todos durumunu güncellemek için setTodos fonksiyonu tanımlandı

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);
    /*
        useEffect hook'u, bileşenin oluşturulduğu anda veya belirli bağımlılıklarda değişiklik olduğunda çalışan bir yan etki fonksiyonunu tanımlamak için kullanılır
        useEffect hooku kullanılarak oluşturulması veya güncellenmesi anında çalışacak yan etki fonksiyonu tanımlanır
        todos durumunu yerel depolamadan alarak başlangıçta doldurur
        boş argüman [] etkinin yalnızca bileşenin oluşturulduğu an için çalışmasını sağlar başka bir değişiklik olmadığında tekrar çağrılmaz
        localStorage üzerinden 'todos' anahtarını kullanarak kaydedilmiş yapılacaklar listesini alır
        localStorage.getItem fonksiyonu veriyi alırken JSON formatından çıkarır savedTodos değişkenine atar
        eğer kaydedilmiş yapılacaklar listesi bulunamazsa veya boşsa varsayılan olarak boş bir dizi atanır
        savedTodos dizisini setTodos fonksiyonuyla todos durumunu günceller başlangıçta yerel depolamada kaydedilen yapılacaklar listesi bileşene yüklenmiş olur
    */


    const addTodo = todo => {
        const newTodos = [...todos, {
            id: uuidv4(), task: todo, completed: false, isEditing: false}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    /*
        addTodo fonksiyonu yapılcak öğesini todos listesine eklemek için
        newTodos adında yeni bir dizi oluşturduk mevcut todos dizisini (...todos) ve yeni bir yapılacak öğesini içerir
        uuidv4() fonksiyonunu kullanarak id özelliğiyle birlikte oluşturuldu
        task özelliği, todo parametresiyle belirtilen yapılacak öğesinin metni
        completed özelliği varsayılan olarak false olarak ayarlanır (tamamlanmamış)
        isEditing özelliği de varsayılan olarak false olarak ayarlanır (düzenleme modu kapalı)
        newTodos dizisi, setTodos fonksiyonu aracılığıyla todos durumunu günceller  yeni yapılacak öğesi todos durumuna eklenir ve bileşen yeniden render edilir
        newTodos dizisi JSON formatına dönüştürülerek 'todos' anahtarıyla localStorage'a kaydedilir yapılacaklar listesi, tarayıcı kapandıktan sonra bile yerel depolamada korunur ve tekrar açıldığında geri yüklenir
    */


    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    /*
      toggleComplete fonksiyonu yapılacak öğesinin tamamlanmış veya tamamlanmamış durumunu değiştirmek için kullanılır 
      todos dizisini map fonksiyonu ile döngüleyerek yeni bir dizi oluşturur
      id parametresi ile yapılacak öğesinin idsi eşit ise yapılacak öğesi tamamlanmışlık durumu değiştirilecek olan yapılacak öğesidir
      Eşleşen yapılacak öğesinin tüm özelliklerini (...todo) alır ve completed özelliğini tersine çevirir 
       Eşleşme sağlanmadığı durumda, yapılacak öğesi olduğu gibi bırakılır ve değişiklik yapılmaz.
       newTodos dizisi, setTodos fonksiyonu ile todos durumunu günceller tamamlanmışlık durumu değiştirilen yapılacak öğesi todos durumunda güncellenir ve bileşen yeniden render edilir
       newTodos dizisini JSON formatına dönüştürerek 'todos' anahtarıyla localStorage'a kaydeder yapılacaklar listesi, tarayıcı kapandıktan sonra bile yerel depolamada korunur ve tekrar açıldığında geri yüklenir

    */


    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    /*
        deleteTodo fonksiyonu yapılacak öğesini silmek için kullanılır
        todos dizisini filter fonksiyonuyla döngüleyerek yeni bir dizi oluşturur
        Yapılcak öğesinin idsi parameter olarak verilen idye eşitse bu yapılacak öğesi silinecek olan yapılacak öğesidir
        newTodos dizisi, setTodos fonksiyonu aracılığıyla todos durumunu günceller silinen yapılacak öğesi todos durumundan kaldırılmış olur ve bileşen yeniden render edilir
    */


    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }
    /*
        editTodo fonksiyonu yapılacak öğesinin düzenleme modunu açıp kapamak için kullanılır
        Yapılacak öğesinin idsi parametre olarak verilen idye eşitse  yapılacak öğesi düzenleme modunu açmak veya kapatmak için değiştirilecek olan yapılacak öğesidir
        isEditing özelliği tersine çevrilir
        Eşleşme sağlanmadığı durumda todos olduğu gibi bırakılır
        newTodos dizisi, setTodos fonksiyonu ile todos durumunu günceller
        düzenleme modu değiştirilen yapılacak öğesi todos durumunda güncellenir ve bileşen render edilir
    */

    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
    /*
        Yapılacak öğesinin görevini düzenlemek için kullanılır
        idler eşitse yapılacak öğesi düzenlenecek yapılacak öğesidir
        task ve isEditinf özelliği güncellenir
        task özelliği task parametresiyle verilen görev metniyle değiştirilir isEditing özelliği de tersine çevrilir
        id eşleşmesi sağlanmadıysa yapılacak öğesi olduğu gibi bırakılır değişiklik yapılmaz
    */
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
         
    </div>
  )
}