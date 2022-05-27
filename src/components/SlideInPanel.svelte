<script>
    export let item;
    export let linkInfo;
    import { BarLoader } from 'svelte-loading-spinners'

</script>


{#if item!=null}
<div class="overlay-content">
 <button class="close" on:click>X</button>
 <h1>{item.name}</h1>
 <ul>
   <li class="flex">
     <div class="col-1" >Kurzfrom</div>
     <div class="col-2" >{item.kuerzel}</div>
 </li>
 <li class="flex">
   <div class="col-1" >Webseite</div>
   <div class="col-2" >{item.webseite}</div>
</li>
 <li class="flex">
     <div class="col-1" >Ebene</div>
     <div class="col-2" >{item.ebene}</div>
 </li>
</ul>
</div> 
{/if} 
{#if linkInfo!=null}
<div class="overlay-content">
 <button class="close" on:click>X</button>
 <h1>{linkInfo.node1.kuerzel} und {linkInfo.node2.kuerzel}</h1>
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
 /* display: flex; */
 overflow: hidden;
 position: absolute; 
 /* z-index: 1; */
 transition: 0.6s;
 top: 0%;
 left: 100%;
 opacity: 1;
 margin-left: auto;
 margin-right: auto;
 padding-top: 50px;
 opacity: 1;

}
.overlay-content {
 transform: translateX(-100%);
}


h1{
 font-family: 'Source Code Pro', monospace;
 top: 0px;
 text-align: center;
 letter-spacing: 1px;
 margin-bottom: 50px;
}
.flex{
   border-radius: 3px;
   padding: 25px 30px;
   display: flex;
   justify-content: space-between;
   margin: 30px 12.5px;
   background-color: #ffffff;
   box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
}
.col-1 {
   flex-basis: 10%;
 }
.col-2 {
   flex-basis: 25%;
 }
.close{
 position: absolute;
 top: 15px;
 left: 15px;
 border: none;
 cursor: pointer;
}
</style>
