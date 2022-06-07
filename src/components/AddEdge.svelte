<script>
  import Button, { Label } from '@smui/button';
  import { getContext } from 'svelte';
  import AutoComplete from "simple-svelte-autocomplete"
  import Dialog from './Dialog.svelte';
    
  const { open } = getContext('simple-modal'); 
  const showSurprise = () => open(Dialog);

  let valueStandard="";
  let valueStandard2="";
  export let searchList;
  export let onSubmit = () => {};
  let data_node1;
  let data_node2;

  
  const { close } = getContext('simple-modal');
    
  let updateNewEdge = () => {
    // let theUrl1 =`http://localhost:5001/api/fetch-by-name/?line2=${valueStandard[0]}&gebiet=${valueStandard[1]}`
    // let theUrl2 =`http://localhost:5001/api/fetch-by-name/?line2=${valueStandard2[0]}&gebiet=${valueStandard2[1]}`
    let theUrl1 =`https://oegdatlas.herokuapp.com/api/fetch-by-name/?line2=${valueStandard[0]}&gebiet=${valueStandard[1]}`
    let theUrl2 =`https://oegdatlas.herokuapp.com/api/fetch-by-name/?line2=${valueStandard2[0]}&gebiet=${valueStandard2[1]}`
    
    fetch(theUrl1).then(function(response) {
      return response.json();
    }).then(function(data) {
      data_node1=data;
    }).catch(function() {
      console.log("Fetch_error");
    });
    
    fetch(theUrl2).then(function(response) {
      return response.json();
    }).then(function(data) {
      data_node2=data;
      onSubmit(data_node1, data_node2);
      close();
    }).catch(function() {
      console.log("Fetch_error",valueStandard, valueStandard2);
    });

    
  }
  </script>
  
  <h3>Neue Zusammenarbeit zwischen zwei Ämtern hinzügen</h3>
  <div class="padding">
    <AutoComplete placeholder="Amt1" items={searchList} bind:selectedItem={valueStandard} />
    <p>{valueStandard}</p>
  </div>
  <div class="padding">
    <AutoComplete placeholder="Amt2" items={searchList} bind:selectedItem={valueStandard2} />
    <p>{valueStandard2}</p>
  </div>
  <div class="button">
  <!-- nächste Zeile kann genutzt werden, damit kante in model hinzugefügt werden kann -> dann noch in model.svelte "addEgde" entkommentieren  -->
  <!-- <Button on:click={updateNewEdge}>Änderung absenden</Button> -->
  <Button on:click={showSurprise}>Änderung absenden</Button>
  </div>

  <style>
      .padding{
          padding-top: 75px;
          padding-bottom: 37px;
      }

      .button{
        color: black;
        padding-top: 37px;
      }

  </style>
