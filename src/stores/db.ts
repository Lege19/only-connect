import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

const useDb = defineStore('db', () => {
    const db: Ref<Promise<IDBDatabase>> = ref(new Promise((resolve, reject) => {
        let req = window.indexedDB.open('ocdata');
        req.onerror = (e) => reject(e);
        req.onsuccess = () => {
            resolve(req.result);
        };
        req.onupgradeneeded = () => {
            req.result.onerror = (e) => console.error(e);
            const table = req.result.createObjectStore('quizes', {keyPath: 'id'});
            table.createIndex('name', 'name', {unique: false});
            table.createIndex('rounds', 'rounds', {unique: false});
            table.createIndex('created', 'created', {unique: false});
            table.createIndex('edited', 'edited', {unique: false});
        };
    }));
    
    return {db};
})

export default useDb;