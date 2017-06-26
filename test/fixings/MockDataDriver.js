const operations = {
    '=' : (a, b) => { return a === b }
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
        value.setId(store.aiCount);

        const newValue = Object.assign(value.get(), {id : value.getId()});
        store.data.push(newValue);
        store.aiCount++;
        this.data[context] = store; 
        return Promise.resolve({state : 1, record : newValue});
    }
    update(context, value) {
        let store = this.getContext(context);
        let updated;
        store.data.forEach((entity) => {
            if(entity.id === value.getId()) {
                entity = Object.assign(entity, value.get());
                updated = entity;
            }
            return entity;
        });
        
        return Promise.resolve({
            state : updated.id !== false,
            record : updated
        });
    }
    delete(context, value) {
        value.set({'deleted' : true});
        this.update(context, value);
        return Promise.resolve({
            state : 1
        });
    }
    getAll(context) {
        return Promise.resolve(this.getContext(context).data);
    }
    getBy(context, field, value) {
        return new Promise((resolve, reject) => {
            this.getAll(context)
            .then((entities) => {
                const results = entities.filter((entity) => {
                    return entity[field] === value
                });
                return resolve(results);
            });
        })
    }
}