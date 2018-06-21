import faker from 'faker';

module.exports.getCategories = () => {

    let categories = localStorage.getItem('categories');
    console.log('getCategories', categories);
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
    console.log('addCategory', categories);
    localStorage.setItem('categories', JSON.stringify(categories));
}

module.exports.saveCategory = (category) => {
    console.log('category', category);
    let categories = JSON.parse(localStorage.getItem('categories'));
    let index = categories.findIndex(x => x.code == category.code);
    console.log('Index', index);
    categories[index] = category;
    console.log('categories', categories);
    localStorage.setItem('categories', JSON.stringify(categories));
}
