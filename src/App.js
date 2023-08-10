import React from 'react'
import './App.css';
import { TodoWrapper } from './components/TodoWrapper';

const App = () => {
  return (
    <div className='App'>
      <TodoWrapper />
    </div>
  )
}

export default App

/*
    hiyerarşi : 

    TodoWrapperLocalStorage : (Ana Bileşen) tüm yapılacaklar listesini yönetiyor
          TodoForm : yeni yapılacakları eklemek için kullanılıyor ve kullanıcıdan metin girdisi alıyor
          Todo : yapılacak öğesini temsil ediyor. TodoWrapperLocalStorage componentinden yapılacakların listesini döngü ile oluşturur
                EditTodoForm : yapılacakları düzenlemek için kullanılıyor Todo içerisindeki düzenle simgesine tıklandığında görüntülenir ve düzenleme bittiğinde güncelleme TodoWrapperLocalStorage da yapılır

*/