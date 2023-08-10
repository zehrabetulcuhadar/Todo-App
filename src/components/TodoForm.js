import React, {useState} from 'react'

export const TodoForm = ({addTodo}) => { 
  const [value, setValue] = useState(''); 

    const handleSubmit = (e) => {       
        e.preventDefault();
        if (value) {           
          addTodo(value);
          setValue('');
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => 
      setValue(e.target.value)} className="todo-input" placeholder='Yeni görev nedir ?' />
    <button type="submit" className='todo-btn'>Görevi Ekle</button>
  </form>
  )
}

/*
    yeni yapılacakları eklemek için kullanılan component
*/
// addTodo propunu alır yeni yapılacak öğelerini eklemek için kullanılacak işlevi temsil eder bu prop
// başlangıçta metin girişi boş ayarlandı useState ile güncellenicek
// handleSubmit olatı formun gönderilmesi
// varsayılan form davranışı engellenir
// vaşue değeri kontrol edilir
// boş değilse addTodo çağrılır
// form gönderiminden sonra form temizlenir setValue('') metin girişi sıfırlanır