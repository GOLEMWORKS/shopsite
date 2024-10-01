initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${filename}` })
    .then(SQL => {
        let db = new SQL.Database(); // Создаём виртуальную базу данных
        db.exec("CREATE TABLE test (Path); INSERT INTO test VALUES ('images/diy.jpg'), ('images/comics.jpg'), ('images/comic.jpg'), ('images/pen_stand.jpg'), ('images/comics.jpg')"); // Заполняем таблицу тестовыми данными
        let stmt = db.prepare("SELECT * FROM test"); 

        const arr = [];

        while (stmt.step()){
            arr.push(stmt.get()); 
        } 
        //stmt.free(); // Освобождаем ресурсы после выполнения запроса

         const container = document.getElementById('image-container');
        
         for (let i = 0; i < arr.length; i += 1) {  
                const img = document.createElement('img');       
                img.src = arr[i];
                img.height = 200; // Тут можно менять для размера картинок в галерее
                container.appendChild(img);
          }
    });