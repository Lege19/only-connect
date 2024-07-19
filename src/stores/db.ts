import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

const useDb = defineStore('db', () => {
    const db: Ref<undefined|IDBDatabase> = ref(undefined);
    const loaded: Ref<boolean> = ref(false);
    let req = window.indexedDB.open('ocdata');
    req.onerror = (e) => console.error(e);
    req.onsuccess = () => {db.value = req.result};
    req.onupgradeneeded = () => {
        db.value = req.result;
        db.value.onerror = (e) => console.error(e);
        const table = db.value.createObjectStore('quizes', {keyPath: 'id'});
        table.createIndex('name', 'name', {unique: false});
        table.createIndex('rounds', 'rounds', {unique: false});
        table.createIndex('created', 'created', {unique: false});
        table.createIndex('edited', 'edited', {unique: false});
        loaded.value = true;
    };
    return {db, loaded}
})

export default useDb;