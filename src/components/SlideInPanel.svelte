<script>
    export let item;
    export let linkInfo;
    import { BarLoader } from 'svelte-loading-spinners'
  	import Button, { Label } from '@smui/button';
    import {createEventDispatcher} from 'svelte';
    import Textfield from '@smui/textfield';
    import IconButton, { Icon } from '@smui/icon-button';
    
    import Dialog from './Dialog.svelte';
    import { getContext } from 'svelte';
    const { open } = getContext('simple-modal'); 
    const showSurprise = () => open(Dialog);
   




    let initialOff = false;
    const dispatch = createEventDispatcher();
    let edit=false
    const handleClick = () => {
		edit= edit === false?true:false;
	  }
  const handleChangesSubmitted = () => {

  }

  const dispatchDialog = () => {
    dispatch("dialogOpen")
    edit= edit === false?true:false;
  }

</script>


{#if item!=null}
<div class="overlay-content">
  <IconButton class="material-icons close" on:click size="mini">close</IconButton>
 <!-- <button class="edit" on:click={handleClick}>Edit</button> -->
 <IconButton class="material-icons edit" on:click={handleClick} size="button" toggle bind:pressed={initialOff}>
  <Icon class="material-icons" on>edit</Icon>
  <Icon class="material-icons">edit_off</Icon>
</IconButton>
 <h1>{item.Line2} {item.Gebiet}</h1>
 <ul>
   <li class="flex">
    {#if edit}
    <div class="col-1" >Kurzform:</div>
    <div class="col-2" >
      <Textfield variant="outlined" bind:value={item.Abkuerzung} label="Eingabe">
      </Textfield>
   </div>
    {:else}  
     <div class="col-1" >Kurzform:</div>
     <div class="col-2" >{item.Abkuerzung}</div>
     {/if}
 </li>
 <li class="flex">
   {#if edit}
   <div class="col-1" >Gebiet:</div>
   <div class="col-2" >
    <Textfield variant="outlined" bind:value={item.Gebiet} label="Eingabe">
    </Textfield></div>
   {:else}  
   <div class="col-1" >Gebiet:</div>
   <div class="col-2">{item.Gebiet}</div>
   {/if}
</li>
 <li class="flex">
    {#if edit}
    <div class="col-1" >Ebene:</div>
    <div class="col-2" >
      <Textfield variant="outlined" bind:value={item.Ebene} label="Eingabe">
      </Textfield></div>
    {:else}  
    <div class="col-1" >Ebene:</div>
    <div class="col-2" >{item.Ebene}</div>
    {/if}
 </li>
</ul>
{#if edit}
<Button on:click={showSurprise} class="submitButton"><Label>Änderung vorschlagen</Label></Button>
{/if}

</div> 
{/if} 
{#if linkInfo!=null}
<div class="overlay-content">
 <button class="close" on:click>X</button>
 <h1>{linkInfo.node1.Abkuerzung} und {linkInfo.node2.Abkuerzung}</h1>
</div>  
{/if}


 



<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@200&display=swap');

.overlay-content {
 
 width: 30%;
 height: 100%;
 background-color: #EDF1EA;
 color: #080808;
 align-content: center;
 overflow: hidden;
 position: absolute; 
 transition: 0.6s;
 top: 0%;
 left: 100%;
 opacity: 1;
 margin-left: auto;
 margin-right: auto;
 padding-top: 50px;
 opacity: 1;
 position: fixed;

}
.overlay-content {
 transform: translateX(-100%);
}
/* .overlay-content{
    position:absolute;
    top:0.5;
    bottom:0;
    left:0;
    right:0;
    overflow:hidden;
    background-color: #EDF1EA;
    position: fixed;
} */

h1{
 /* font-family: 'Source Code Pro', monospace; */
 top: 0px;
 padding: 0px 45px;
 text-align: left;
 letter-spacing: 1px;
 margin-bottom: 50px;
}
/* .flex{
   border-radius: 3px;
   padding: 25px 30px;
   display: flex;
   justify-content: space-between;
   margin: 30px 12.5px;
   background-color: #ffffff;
   box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
} */

.flex{
   border-radius: 3px;
   padding: 20px 30px;
   display: flex;
   justify-content: space-between;
   margin: 15px 12.5px;
   background-color: #ffffff;
   box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
}

.col-1 {
   flex-basis: 10%;
 }
.col-2 {
   flex-basis: 25%;
 }
 * :global(.close){
 position: absolute;
 top: 10px;
 left: 15px;
 border: none;
 cursor: pointer;
}
* :global(.edit){
 position: absolute;
 top: 10px;
 right: 15px;
 border: none;
 cursor: pointer;
}

/* * :global(.submitButton) {
    position: absolute;
    right: 25%;
    color: #080808;
  } */
  * :global(.submitButton) {
    position: absolute;
    left:50px;
    color: #080808;
  }
 

  @media screen and (max-width: 1500px) {
    .overlay-content{
      width:100%
    }
    
 }
</style>
