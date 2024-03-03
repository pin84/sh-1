class IndexDB{

  constructor(){

  }

  openDB(){
    const request = window.indexedDB.open("MyTestDatabase", 3);

    debugger
  }


}

var IDB = new IndexDB()