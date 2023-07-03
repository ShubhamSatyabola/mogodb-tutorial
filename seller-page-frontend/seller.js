var form = document.getElementById('addform')

form.addEventListener('submit', setlocalStorage)

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/get-product');
        for(i in res.data.allProducts){
            showOnScreen(res.data.allProducts[i])
        }
    }catch(err){
        console.log(err)
    }
})
async function setlocalStorage(e){
    try{e.preventDefault();
    
    var name = document.getElementById('name').value;
    var cost = document.getElementById('cost').value;
    var category = document.getElementById('Category').value;
    
    const data = {name , cost , category};
    const response = await axios.post('http://localhost:3000/post-product', data)
    console.log('done')
    showOnScreen(response.data.newProduct);
    }catch (err){
        console.log(err)
    }
}
async function showOnScreen(data){
    try{
        document.getElementById('name').value = " ";
        document.getElementById('cost').value = " ";
        document.getElementById('Category').value = " ";

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';

        const displayElement = document.createElement('div');
        displayElement.innerHTML = `Product Name <b>${data.name}</b> and Price is <b>${data.cost}</b> Category is <b>${data.category}</b> `;
        displayElement.appendChild(deleteButton);
        
        if (data.category === 'Stationary') {
            STATIONARY.appendChild(displayElement);
        } else if (data.category === 'Clothes') {
            CLOTHES.appendChild(displayElement);
        } else {
            ELECTRIC.appendChild(displayElement);
        }
        deleteButton.onclick = () => {
            axios.delete(`http://localhost:3000/delete-product/${data.id}`)
            if (data.category === 'Stationary') {
                STATIONARY.removeChild(displayElement);
            } else if (data.category === 'Clothes') {
                CLOTHES.removeChild(displayElement);
            } else {
                ELECTRIC.removeChild(displayElement);
            }
        }
        
    }catch(err){
        console.log(err);
    }
    
    }
    

