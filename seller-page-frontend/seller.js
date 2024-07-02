var form = document.getElementById('addform')

form.addEventListener('submit', setlocalStorage)

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('http://localhost:3000/get-product');
        console.log(res);
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
    var _id = document.getElementById("editId").value;
        // console.log(_id);
    const data = { name, cost, category };
    if(_id){
        data._id = _id;
        const response = await axios.put(
          "http://localhost:3000/update-product",
          data
        );
       console.log(response);
window.location.reload()
    }
    else{
        const response = await axios.post(
          "http://localhost:3000/post-product",
          data
        );
        console.log("done");
        showOnScreen(response.data.newProduct);
    }
    
    
    }catch (err){
        console.log(err)
    }
}
async function showOnScreen(data){
    try{
        document.getElementById('name').value = "";
        document.getElementById('cost').value = "";
        document.getElementById('Category').value = "";

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";

        const displayElement = document.createElement('div');
        displayElement.innerHTML = `Product Name <b>${data.name}</b> and Price is <b>${data.cost}</b> Category is <b>${data.category}</b> `;
        displayElement.appendChild(deleteButton);

        displayElement.appendChild(editButton);
        
        if (data.category === 'Stationary') {
            STATIONARY.appendChild(displayElement);
        } else if (data.category === 'Clothes') {
            CLOTHES.appendChild(displayElement);
        } else {
            ELECTRIC.appendChild(displayElement);
        }
        deleteButton.onclick = async() => {
            const res = await axios.delete(`http://localhost:3000/delete-product/${data._id}`)
            if (data.category === 'Stationary') {
                STATIONARY.removeChild(displayElement);
            } else if (data.category === 'Clothes') {
                CLOTHES.removeChild(displayElement);
            } else {
                ELECTRIC.removeChild(displayElement);
            }
            alert(res.data.message)
        }
        editButton.onclick = () =>{
            console.log("clicked");
            document.getElementById('name').value = data.name;
            document.getElementById('cost').value = data.cost;
            document.getElementById('Category').value = data.category;
            document.getElementById("editId").value = data._id;
        }
        
    }catch(err){
        console.log(err);
    }
    
    }
    

