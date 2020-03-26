


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
        btn.setAttribute('type','button');
        btn.classList.add('btn');
        btn.classList.add('btn-primary');
        btn.setAttribute('data-toggle','modal');
        btn.setAttribute('data-target','#modal_details');

        listItem.classList.add('list-group-item');
        listItem.appendChild(btn);
        plist.appendChild(listItem);
        
        $(btn).click(function(){
            loadDetails(pokemon);
        })
        


    }
    
    
    
    
    function loadList(){
        
//        showLoadingMessage();
        var path='https://pokeapi.co/api/v2/pokemon/';
        fetch(path).then(function(response){
            return response.json();
        }).then(function(list){
            
            list.results.forEach(function(item){
                var pokemon = {name:item.name, detailsUrl:item.url};
                
                add(pokemon);
            });

        }).catch(function (e) {
            console.error(e);
        });
        
//        hideLoadingMessage();
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
            
            
            $('#pokemon_name').html("Name: "+pokemon.name);
            $('#pokemon_height').html("Height: "+pokemon.height);
            document.getElementById('image_pokemon').src=pokemon.imgUrl;
            
            hideLoadingMessage();
            
            $('.close_modal').click(function(){
                $('#pokemon_name').html("");
                $('#pokemon_height').html("");
                document.getElementById('image_pokemon').src="#"
            })
        });
        
        
    }
    
     function showLoadingMessage(){
         document.getElementById('div_loading').style.display='flex';
         
     }   
    
    function hideLoadingMessage(){
        document.getElementById('div_loading').style.display='none';
    }
    
    return {loadList:loadList,add:add,getAll:getAll};  
    
    
    
//    function closeModal(){
//        //close the modal
//        document.querySelector('#div_modal_container').style.display='none';
//        
//        //show the pokemon list
//            var fade =document.querySelectorAll('.fade');
//            fade.forEach(function(i){
//                i.style.opacity='1';
//            });
//        
//    }
    
    
    
})();


pokemonRepository.loadList();
//console.log(pokemonRepository.getAll());
















 
