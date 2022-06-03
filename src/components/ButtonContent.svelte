<script>
    import { getContext } from 'svelte';
    import AddEdge from './AddEdge.svelte';
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    const {open} = getContext('simple-modal');
    export let searchList;
    let data_node1;
    let data_node2;

    const showSurprise = () => open(AddEdge, { searchList:searchList, onSubmit });

    const onSubmit = (node1, node2) => {
		data_node1 = node1;
		data_node2 = node2;
    dispatch("add_Edge", {data_node1 : data_node1, data_node2: data_node2})
	}
  </script>
  
  <p>
      <button class="myButton" on:click={showSurprise}>+ Kooperation hinzufügen</button>
  </p>


  <style>
    .myButton {
	
	background: white;
	background-color:#ffffff;
	/* border-radius:6px; */
	border:1px solid black;
	display:inline-block;
	cursor:pointer;
	color:black;
	font-family:Arial;
	font-size:15px;
	/* font-weight:bold; */
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
}
.myButton:hover {
	background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
	background-color:#f6f6f6;
}
.myButton:active {
	position:relative;
	top:1px;
}

  </style>