


var pokemonRepository = (function(){
    
    
    var repository=[];
    
    
    

    
    
    
    var plist=document.querySelector('.list_pokemon');
    var loadingMessage ='List loading...';
    
    
    function getAll(){
        
        return repository;
        
    }

    function addListItem(pokemon){
        
        var listItem=document.createElement('li');
        var btn = document.createElement('button');
        
        
        btn.innerText=pokemon.name;
        btn.classList.add('button_pokemon');
        listItem.appendChild(btn);
        plist.appendChild(listItem);
        
       
        
        
        
        btn.addEventListener('click',function(){
        
        showDetails(pokemon);
        });
        
    }
    
    function showDetails(pokemon){
        loadDetails(pokemon);
    }
    
    
    function loadList(){
        showLoadingMessage();
        var path='https://pokeapi.co/api/v2/pokemon/';
        fetch(path).then(function(response){
            return response.json();
        }).then(function(list){
            
            list.results.forEach(function(item){
                var pokemon = {name:item.name, detailsUrl:item.url};
                add(pokemon);
            })
            
            
            
            
            
        }).catch(function (e) {
            console.error(e);
        });
        
        hideLoadingMessage();
    }
    
    
    function add(pokemon){

            repository.push(pokemon);
            addListItem(pokemon);
            
            
    } 
    
    function loadDetails(pokemon){
        showLoadingMessage();
        var path = pokemon.detailsUrl;
        
        fetch(path).then(function(response){
            return response.json();
        }).then(function(details){
            
            var height = details.height;
            var imgUrl =details.sprites.front_default;
            pokemon = {name:pokemon.name,detailsUrl:pokemon.detailsUrl, height:height, imgUrl:imgUrl};
            
            //add values to the modal elements
            document.getElementById('p_name').innerHTML=pokemon.name;
            document.getElementById('p_height').innerHTML=pokemon.height;
            document.getElementById('image_pokemon').src=pokemon.imgUrl;
            
            //fade the pokemon list
            var fade =document.querySelectorAll('.fade');
            fade.forEach(function(i){
                i.style.opacity='0.2';
            });
            
            //display the modal
            document.querySelector('#div_modal_container').style.display='flex';
            
            //add listener to the close button and for other close methods
            document.querySelector('#button_modal_close').addEventListener('click',closeModal);
            document.addEventListener('keydown',function(src){
                if(src.key==='Escape'){
                    closeModal();
                }
            });
            
            document.querySelector('#div_modal_container').addEventListener('click',function(src){
                if(src.target.id==='div_modal_container'){
                    closeModal();
                }
            })
            
        });
        
        hideLoadingMessage();
    }
    
     function showLoadingMessage(){
         document.getElementById('div_loading').style.display='block';
         
     }   
    
    function hideLoadingMessage(){
        document.getElementById('div_loading').style.display='none';
    }
    
    return {loadList:loadList,add:add,getAll:getAll};  
    
    
    
    function closeModal(){
        //close the modal
        document.querySelector('#div_modal_container').style.display='none';
        
        //show the pokemon list
            var fade =document.querySelectorAll('.fade');
            fade.forEach(function(i){
                i.style.opacity='1';
            });
        
    }
    
    
    
})();


pokemonRepository.loadList();
//console.log(pokemonRepository.getAll());
















 
