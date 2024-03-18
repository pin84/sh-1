class IndexDB{

  constructor(){

  }

  openDB(){
    const request = window.indexedDB.open("MyTestDatabase", 3);

  }


}

var IDB = new IndexDB()