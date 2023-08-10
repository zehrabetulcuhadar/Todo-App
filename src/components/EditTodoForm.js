import React, {useState} from 'react';

// yapılacak öğesini düzenlemek için kullanılan component

/* 
    kullanıcı düzenleme bittikten sonra add task a 
    bastığında editTodo işlevi çağrılır ve metni günceller
*/

export const EditTodoForm = ({editTodo, task}) => { // editTodo (düzenleme) ve task (mevcut yapılacak öğesi) propları alır
  const [value, setValue] = useState(task.task); // value düzenleme alanındaki metini tutar setValue fonksiyonu ile güncellenir
  // task.task ile useState i başlatıyoruz mevcut yapılacak öğesinin metni düzenleme alanında önceden doldurulsun diye
    const handleSubmit = (e) => { // formun gönderilme olayı
      // varsayılan form davranılı engellenir
        e.preventDefault();
        // value yani düzenlenen yapılacak öğesinin metni ve task id yani düzenlenen yapılacak öğesinin idsi ile editTodo çağrılır
        editTodo(value, task.id);
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    {/* metin girişinde value değer olarak alınır onChange olayı da her metin girişi değiştiğinde setValue fonksiyonunu tetiklicek fonksiyon kullanıcının girdiği metni value durumna atar */}
    {/* e.target ifadesi olayın tetiklendiği DOM öğesini yani metin girişini ifade eder value ise mevcut metin değeri*/}
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Görevi güncelle' />
    <button type="submit" className='todo-btn'>Güncelle</button>
  </form>
  )
}
