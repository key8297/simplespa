import faker from 'faker';

const guid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

module.exports.getAccounts = () => {
    let accounts = localStorage.getItem('accounts');
    if(!accounts || accounts.length == 0){
        accounts = [];
        let account = {};
        for(let i = 0; i < 5; i++){
            account = faker.helpers.createCard();
            account.id = guid();
            delete account['accountHistory'];
            delete account['posts'];
            accounts.push(account);
        }
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
    else {
        accounts = JSON.parse(accounts)
    }

    return accounts;
}

module.exports.getAccount = (id) => {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(x => x.id == id);

    return accounts[index];
}

module.exports.addAccount = (account) => {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

module.exports.saveAccount = (account) => {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(x => x.id == account.id);
    accounts[index] = account;
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

module.exports.deleteAccount = (accountId) => {
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let index = accounts.findIndex(x => x.id == accountId);
    accounts.splice(index,1);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}


module.exports.getCategories = () => {
    let categories = localStorage.getItem('categories');
    if (!categories) {
        categories = [
            {
                code: 'Bicycle',
                description: 'Bicycle',
                active: 'true'
            },
            {
                code: 'Shirt',
                description: 'Shirt',
                active: 'true'
            },
            {
                code: 'Bicycle-old',
                description: 'Bicycle',
                active: 'false'
            }
        ];
        localStorage.setItem('categories', JSON.stringify(categories));
    }
    else {
        categories = JSON.parse(categories)
    }

    return categories;
}

module.exports.addCategory = (category) => {
    let categories = JSON.parse(localStorage.getItem('categories'));
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
}

module.exports.saveCategory = (category) => {
    let categories = JSON.parse(localStorage.getItem('categories'));
    let index = categories.findIndex(x => x.code == category.code);
    console.log('Index', index);
    categories[index] = category;
    console.log('categories', categories);
    localStorage.setItem('categories', JSON.stringify(categories));
}
