let displayPostings= document.querySelector('#postings')
let search = document.querySelector('#searchButton')
search.addEventListener('click', e =>{
    getPostings()
})


 function getPostings(){
     document.querySelector('#postings').innerHTML = ''
    firebase.database().ref('/').on('value', (snapshot)=>{
        let data= snapshot.val()
        let displayPostings = document.querySelector('#postings')
        let userInput = document.querySelector('#search').value
        
        
        for(key in data){
            if(data[key].subject == userInput)
            displayPostings.innerHTML += `
            <div class = 'col-6'>
                <div class="box" style="min-height:15rem">
                  <div class="col-12">
                    <p class="col-12"><b>Course:</b>  ${data[key].subject}</p>
                    <p class="col-12"><b>Topic:</b> ${data[key].title}</p>
                    <p class="col-12"><b>Email: </b>${data[key].email}</p>
                    <p class="col-12"><b>Description:</b> ${data[key].description}</p>
                    <a href="${data[key].file}" class="btn btn-primary">Download File</a>
                  </div>
                </div>
            </div>
                `
            console.log(displayPostings)
        }
    })
}
 
