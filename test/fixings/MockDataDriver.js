const operations = {
    '=' : (a, b) => { return a === b }
}

const performQuery = (queries, entity) => {
    let match = true;
    queries.forEach((q) => {
        const result = operations[q.type](entity[q.field], q.value);
        if(result === false) {
            match = false;
        }
    });
    return match;
}

export default class mockDataDriver {
    constructor() {
        this.data = [];
    }
    getContext(context) {
        return this.data[context] ? this.data[context] : {aiCount : 0, data : []};
    }
    create(context, value) {
        let store = this.getContext(context);
        value.id = store.aiCount;
        store.data.push(value);
        store.aiCount++;
        this.data[context] = store; 
        return Promise.resolve({state : 1, record : value});
    }
    update(context, value) {
        let store = this.getContext(context);
        let updated;

        store.data.forEach((entity) => {
            if(entity.id === value.id) {
                entity = Object.assign(entity, value);
                updated = entity;
            }
            return entity;
        });
        
        return Promise.resolve({
            state : !isNaN(updated.id),
            record : updated
        });
    }
    delete(context, value) {
        value.deleted = true;
        this.update(context, value);
        return Promise.resolve({
            state : 1
        });
    }
    getAll(context) {
        return Promise.resolve(this.getContext(context).data);
    }
    query(context, queries) {
        return new Promise((resolve, reject) => {
            this.getAll(context)
            .then((entities) => {
                const results = entities.filter((entity) => {
                    return performQuery(queries, entity);
                });
                return resolve(results);
            });
        })
    }
}