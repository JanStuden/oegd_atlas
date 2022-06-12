<script>
    import ButtonContent from './ButtonContent.svelte'
    import {createEventDispatcher} from 'svelte';
    import Select from 'svelte-select';
    import dagre from 'cytoscape-dagre';
    import Autocomplete from '@smui-extra/autocomplete';
    import Button, { Label } from '@smui/button';
    import Modal from 'svelte-simple-modal';
    import { v4 as uuidv4 } from 'uuid';
    import AutoComplete from "simple-svelte-autocomplete";
    import Icon from "svelte-material-icons/Tune.svelte";
    import Search from "svelte-material-icons/Magnify.svelte";

 
    export let allGebiete = [];

    let searchListStrings = [];
    let alleProjekte = [];
    let selectedNode;
    let collectionCompoundNodes;
    let projektPicked=false;
    // let urlEdges = 'http://localhost:5001/api/fullEdgeList';
    // let urlNodes = 'http://localhost:5001/api/fullList'
    let urlEdges = 'https://oegdatlas.herokuapp.com/api/fullEdgeList';
    let urlNodes = 'https://oegdatlas.herokuapp.com/api/fullList'
    
    
        let items = [
            { value: 'Ebene', label: 'Ebene' },
            { value: 'Region', label: 'Region' },
            { value: 'Projekte', label: 'Projekte' }
        ];

        let projekte = [
            { value: 'Affenpocken', label: 'Affenpocken' },
            { value: 'UkraineSchutzimpfung', label: 'Ukraine Schutzimpfung' },
        ];
    
    let search_Result;
    let valueSelected= { value: 'Region', label: 'Region' };
    let projectSelected= { value: 'Affenpocken', label: 'Affenpocken' };

	let showEbenen=false;

    

    let showProjekte=false;

    let ebenenChecks = [
		'Bund',
		'Land',
		'Kommune'
	];

    let checkedEbenen = [
        
    ];

    const dispatch = createEventDispatcher();
    let cy;
    let knoten;
    let allEdges=[]
    let allNodes = []

    Promise.all([
        fetch(urlEdges)
    ]).then(([edges])=> edges.json()
    ).then(data => {
     allEdges=data
    })
    // $(function() {  
    fetch(urlNodes)
    .then(res => res.json())
    .then(data => {
     //console.log(data) 
     allNodes = data
     console.log(allNodes[0]['data'])
    // edgesArr = await fetch(urlEdges);      
                
               
                cytoscape.use(dagre);
                cy = cytoscape({
                container: document.getElementById('cy'),
                style: [
                    
                    // {
                    //     selector: 'node.highlighted',
                    //     css: {
                    //         'active-bg-color': 'red',
                    //         //'border-width': '2px'
                    //     }
                    //  },
                    {
                        selector: 'node',
                        css: {
                            shape: 'rectangle',
                            width: 70,
                            height: 50,
                            'background-color':'#61bffc',
                            // content: 'data(kuerzel)',
                            // 'text-wrap': 'wrap',
                            // 'text-valign': 'center',
                            
                        }
                        
                    },
                    {
                    selector: ':parent',
                        css: {
                            'text-valign': 'top',
                            'text-halign': 'right',
                            'background-color': 'white',
                            'border-color': 'black',
                            //'background-image': 'data:image/png;base64,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',
                            'background-height': '80%',
                            'background-width' : '60%',
                            'background-image-opacity': 0.5,
                            'min-width': 1300,
                            'min-height': 700,
                            'min-width-bias-right': 100,
                            'min-height-bias-bottom': 100
                            
                        }
                    },
                     {
                        selector: 'edge.highlighted',
                        css: { 'mid-target-arrow-color': '#FFF' }
                        },
                    
                                        
                ],
                elements: {
                    nodes: data,
                    parents: [],  
                    edges: allEdges
                },

                layout: {
                name : 'preset',
                }
            });
            //console.log(cy.nodes())
            cy.nodeHtmlLabel([
            {
                query: 'node', // cytoscape query selector
                halign: 'center', // title vertical position. Can be 'left',''center, 'right'
                valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
                halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
                valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
                cssClass: '', // any classes will be as attribute of <div> container for every title
                tpl(data) {
                    //später lsg. -> data.parent == Undefined filtern, jetzt erstmal nur brandenburg parent wird gefiltert
                if(cy.getElementById(data.id).isParent()===false) {
                    return `<div><div class="rect"><p><span class>${data.Abkuerzung}</span></p>
                    </div>
                    <div class="kreis"><p class="fuerDemo">${data.Ebene}</p></div></div>`;    
                } 
                else{
                    return;
                }}
            }
            ]);

            cy.nodeHtmlLabel([
            {
                query: ':parent', // cytoscape query selector
                halign: 'left', // title vertical position. Can be 'left',''center, 'right'
                valign: 'top', // title vertical position. Can be 'top',''center, 'bottom'
                halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
                valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
                cssClass: '', // any classes will be as attribute of <div> container for every title
                tpl(data) {
                    return `<div class="parentRel"><p>.</p><div class="parentPos"><p><span >${data.id}</span></p>
                    </div></div>`;    
                }
            }    
            ]);
            

            collectionCompoundNodes = cy.collection();
            let arrayOfParents = [ 'Bayern','Baden-Württemberg','Berlin','Brandenburg','Bremen','Hamburg','Hessen','Mecklenburg-Vorpommern','Niedersachsen','Nordrhein-Westfalen','Rheinland-Pfalz',
             'Saarland','Sachsen', 'Sachsen-Anhalt','Schleswig-Holstein','Thüringen', 'Bund'];
            arrayOfParents.forEach( element => {
                let compoundNode = cy.getElementById(element)
                collectionCompoundNodes = collectionCompoundNodes.union(compoundNode)
            })


            // let index=1;
            // const fahnen=[,'data:image/png;base64,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','https://i.ebayimg.com/images/g/0PsAAOSwSWZerCbx/s-l300.jpg',
            // 'data:image/png;base64,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','data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/jpeg;base64,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',
            // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqxdYFgKa8ZJXWgneLHzEva5aQ_l1F2IOVAg&usqp=CAU', 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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',
            // 'data:image/png;base64,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','data:image/png;base64,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','data:image/png;base64,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']
            // //cy.getElementById('Berlin').style('background-image', 'https://i.ebayimg.com/images/g/0PsAAOSwSWZerCbx/s-l300.jpg')
            // // arrayOfParents.forEach( element => {
            // //     let aktuellerIndex = fahnen[index];
            // //     cy.getElementById(element).style('background-image', aktuellerIndex);
            // //     index=index+1;
            // // })
            cy.getElementById('Bund').style('min-width', 5800)
            cy.getElementById('Bund').style('min-height', 350)
            cy.getElementById('Bund').style('min-width-bias-left', 82)
            cy.zoomingEnabled( true );  
            cy.maxZoom(2.5)
            cy.minZoom(0.15)
            console.log(cy.minZoom())
            
            // cy.on('click', 'node',function(e){
            //     console.log(e.target.data());
            // })
            cy.on('tap', 'node', function (evt) {
                knoten = evt.target;
                if(knoten.isParent()==false)
                //console.log(knoten.data());
                dispatch('showPanel', knoten.data())
            });
            cy.on('tap', 'edge', function (evt) {
                knoten = evt.target;
                
                let idSource = knoten.data().source;
                let idTarget = knoten.data().target;
                let source= cy.getElementById(idSource).data();
                let target= cy.getElementById(idTarget).data();

                let linkPair = {
                    node1: source,
                    node2: target
                };
                dispatch('showPanelForLinks', linkPair)
            });

            // let collectionBrandenburg = cy.$('#6').neighborhood();
            // let brandenburgGesundheitsamt = cy.elements('node#6');
            // collectionBrandenburg= collectionBrandenburg.union(brandenburgGesundheitsamt);
            // collectionBrandenburg =collectionBrandenburg.filter('node[id != "2"]');
            // collectionBrandenburg.forEach(function( ele ){
            // //console.log( ele.data() );
            // });
            // let boundingBox=collectionBrandenburg.boundingBox();
            // var brandenBurgLayout= collectionBrandenburg.layout({
            //     name: 'concentric',
            //     // rows: 2,
            //     avoidOverlap: true,
            //     padding: 2500,
            //     boundingBox: boundingBox,
            //     // avoidOverlapPadding: 500
            //     avoidOverlap: true,
            //     minNodeSpacing: 100
                
            // });
    
    let alleInBrandenburg = cy.nodes().filter((ele) => {
            return ele.data('parent')== 'Brandenburg';});
    let alleInBrandenburgAußerKommunen = alleInBrandenburg.filter((ele) => { return  ele.data('Ebene')!== 'Kommune';})
    let brandenburgLayoutFull = alleInBrandenburgAußerKommunen.layout({
        name: 'grid',
        avoidOverlap: 'true'
    })
    let alleInBerlin = cy.nodes().filter((ele) => {
            return ele.data('parent')== 'Berlin';});
    let berlinLayoutFull = alleInBerlin.layout({
        name: 'dagre',
    })
    //berlinLayoutFull.run();
    

    let xaxis = 0;
    let yaxis = 0;
    let counter = 1;
    arrayOfParents.forEach( element => {
        let alleInBundesland = cy.nodes().filter((ele) => {
            return ele.data('parent')== element;});
        
        let alleKommunenInBundesland = alleInBundesland.filter((ele) => { return  ele.data('Ebene')== 'Kommune';})
        let alleAufLandesebeneInBundesland = alleInBundesland.filter((ele) => { return  ele.data('Ebene')== 'Land';})  
        alleInBundesland.shift({ x: xaxis, y: yaxis });
        if(counter%4 == 0){
            xaxis=0;
            yaxis=yaxis+900;    
        }
        else {
            xaxis=xaxis+1500;
            
        }
        const golden = 1.61803398874989;
        let size = alleKommunenInBundesland.size()
        // let b = size/golden
        // b=Math.sqrt(b)
        // let a = size/b
        // a=Math.round(a)
        // console.log("erstes A:", a) -> einfach variante falls 2 nicht mehr funtkioniert basierend auf anzahl der landesinstitute
        let b = size/golden
        b+=0.25
        b=Math.sqrt(b)
        b-=0.5
        let a = size/b
        a=Math.round(a)
        //console.log("zweites A:", a)
        let xshift=0;
        let yshift=0;
        alleKommunenInBundesland.forEach((ele) =>{
            ele.shift({x: xshift, y:yshift})
            xshift+=100;
            if(xshift>12*100){
                yshift+=100;
                xshift=0;
            }
        })
        yshift=-100
        xshift=0
        let anzahlLandesinstuteProBundesland = alleAufLandesebeneInBundesland.size()
        alleAufLandesebeneInBundesland.forEach((ele) => {
            let xshiftFaktor=12/(anzahlLandesinstuteProBundesland+1)
            xshift+= xshiftFaktor*100
            ele.shift({x: xshift, y:yshift})
        })
        

        //console.log(xaxis, yaxis)
        counter=counter+1;
    })
    let alleAufBundeseben = cy.nodes().filter((ele) => {
            return ele.data('parent')== 'Bund';});
    
    let xshift1=0
    let xshift2=0
    let yshift=0
    alleAufBundeseben.shift({ x: 0, y: -4250 });   
    let xshiftFaktor=5600/6
    let xshiftFaktor2=5600/9
    alleAufBundeseben.forEach((ele) => {
            let name_institute = ele.data('Line2')
            if(name_institute.startsWith("Bundesministerium")){
                console.log(ele.data())
                yshift=0
                xshift1+=xshiftFaktor
                ele.shift({x: xshift1, y:yshift})
                
            }
            else{
                yshift=150
                console.log(xshift2);
                xshift2+=xshiftFaktor2   
                ele.shift({x: xshift2, y:yshift})
                
            }
        })    
    //brandenburgLayoutFull.run();
    
            let hovered;
            let neighborsOfHoverd;
            let noDirectNeighbors;
            cy.on('mouseover', 'node', (e) => { 
                
                //console.log( e.target.data())
                if(projektPicked==false){
                    hovered = e.target.data();
                    neighborsOfHoverd = cy.$('#'+hovered.id).neighborhood();
                    neighborsOfHoverd=neighborsOfHoverd.union('#'+hovered.id);
                    noDirectNeighbors=cy.nodes().difference(neighborsOfHoverd);
                    neighborsOfHoverd.style('background-color', '#61bffc' )
                    noDirectNeighbors.style('background-color', 'grey');
                    neighborsOfHoverd.style('line-color', '#61bffc')
                    collectionCompoundNodes.style('background-color', 'white');
                }
            })

            


            cy.on('mouseout', 'node', (e) => { 
                // noDirectNeighbors.style('background-color','#61bffc')
                if(projektPicked==false){
                handleChange();
                neighborsOfHoverd.style('line-color', 'grey')
                collectionCompoundNodes.style('background-color', 'white');
                }
            })

    // cy.resize()
    // cy.fit()
    cy.zoomingEnabled( true );
    cy.panningEnabled( true );

    let offset= cy.container().offsetWidth
    if(offset<1500){
        cy.minZoom(0.1)
        cy.viewport({
            zoom: 0.1,
            pan: { x: 350, y: 120 }
        });
    }
    else{
        cy.viewport({
            zoom: 0.18,
            pan: { x: 400, y: 170 }
        });
    }
    cy.autolock( true );

    allNodes.forEach((node) => { 
            allGebiete.push([node['data']['Line2'], node['data']['Gebiet']])
            searchListStrings.push(`${node['data']['Line2']} ${node['data']['Gebiet']}`)
        })

    allNodes.forEach((node) => {
        if(node['data']['Projekte']!=null){
            let arr= node['data']['Projekte']
            arr.forEach((p) => {
                if(!alleProjekte.includes(p))
                alleProjekte.push(p)
            })
        } 
        })
    
    })

    
    

    function handleChange(){

        
        if (checkedEbenen.length > 0 ) {
        
            let all;
            // let nullVar = checkedEbenen[0];
            checkedEbenen.forEach((ebene) => {
                let filter= cy.nodes().filter(function( ele ){
                return ele.data('Ebene') == ebene;
            });
                all = filter.union(all)
            })
            all.style('background-color','#61bffc')
            let noDirectNeighbors=cy.nodes().difference(all);
            noDirectNeighbors.style('background-color', 'grey')
            collectionCompoundNodes.style('background-color', 'white');
        }
        else {
            cy.nodes().style('background-color', '#61bffc')
            collectionCompoundNodes.style('background-color', 'white');
        }
        
        
        
    }

    function handleSelect(event){
        projektPicked=false;
        if(event.detail.value=='Ebene'){
            showEbenen = true;
            showProjekte=false;
            //console.log(show)
        }
        else if(event.detail.value=='Projekte'){
            showProjekte = true;
            showEbenen=false;
        }
        else{
            showEbenen=false;
            showProjekte=false;
            //showProjekte=false
        }
    }

    function handleClear(){
        projektPicked=false;
        showEbenen=false;
        showProjekte=false;
    }

    function handleClick(){
        
        //console.log(cy.getElementById('25').position())
        //console.log(cy.getElementById('105').position())
        // cy.zoom({
        // level: 1,
        // position: cy.getElementById('105').position()
        // });
        cy.fit( cy.$('#109') );
    }
    
    const add_Edge = (event) => {
        

        // -> add Edge in DB
        // let id1 = uuidv4();
        // // conosole.log(id)
        // console.log("node1:", event.detail.data_node1['data'], "node2", event.detail.data_node2['data'])
        // cy.add([
        //     { group: 'edges', data: { id: id1 , source: event.detail.data_node1['data']['id'], target: event.detail.data_node2['data']['id'] } }
        // ]); 
        // //window.location.reload();

        // (async () => {
        //     let edge= { "data": { "id": id1, "source": event.detail.data_node1['data']['id'], "target":  event.detail.data_node2['data']['id'] } }
        //     //const rawResponse = await fetch('http://localhost:5001/api/post-edge', {
        //     const rawResponse = await fetch('https://oegdatlas.herokuapp.com/api/post-edge', {    
        //         method: 'POST',
        //         headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //         },  
        //         body: JSON.stringify(edge)
        //     });
        //     const content = await rawResponse.json();

        //     console.log(content);
        // })();
    }

    const highlightSelected = (event) => {

        let ele;
        selectedNode=allGebiete[searchListStrings.indexOf(event.detail.value)]
        if(selectedNode != null){
            console.log(selectedNode)
            //let theUrl =`http://localhost:5001/api/fetch-by-name/?line2=${selectedNode[0]}&gebiet=${selectedNode[1]}`
            let theUrl =`https://oegdatlas.herokuapp.com/api/fetch-by-name/?line2=${selectedNode[0]}&gebiet=${selectedNode[1]}`
            fetch(theUrl).then(function(response) {
            return response.json();
            }).then(function(data) {
             ele = cy.getElementById(data['data']['id'])
             console.log(ele)
             ele.style('background-color', '#61bffc' )
             cy.nodes().difference(ele).style('background-color', 'grey')   
             collectionCompoundNodes.style('background-color', 'white');
            }).catch(function() {
            console.log("Fetch_error");
            });
        }
    }

    const handleProjectPicked = (event) => {
        alleProjekte.filter(n => n)
        let ele;
        let eles=cy.collection();
        projektPicked=true;
        if(event.detail.value!=null){
            console.log(event.detail.value)
            let theUrl =`https://oegdatlas.herokuapp.com/api/fetch-by-projekt/?projekt=${event.detail.value}`
            fetch(theUrl).then(function(response) {
            return response.json();
            }).then(function(data) {
                data.forEach((element) => {
                    ele = cy.getElementById(element['data']['id'])
                    eles=eles.union(ele)
                })
             console.log(eles.size())
             eles.style('background-color', '#61bffc' )
             cy.nodes().difference(eles).style('background-color', 'grey')   
             collectionCompoundNodes.style('background-color', 'white');    
            }).catch(function() {
            console.log("Fetch_error");
            });
        }
    }

    const handleProjektClear = (event) => {
        projektPicked=false;
        console.log("ausgelöst")
    }

</script>

<!-- <main> -->
<div class="wrapper">

<h1 class="flex_item justify-start">ÖGD-Atlas</h1>
<div class="flex_item select flexible_width"> 
    <!-- <AutoComplete placeholder="Suche" items={allGebiete} bind:selectedItem={selectedNode} onChange={highlightSelected}>
    </AutoComplete> -->
    <Select Icon={Search} listAutoWidth=true items={searchListStrings} value={search_Result} placeholder="Suche" on:select={highlightSelected} />
</div>
<Modal class="flex_item"> 
    <ButtonContent on:add_Edge={add_Edge} searchList={allGebiete}></ButtonContent>
</Modal>
</div>    
        <div class="wrapper1">
            <!-- <button on:click={handleClick}>
                Click me
            </button> -->  
            <div class="flex_item1 select constant_width">
            <Select Icon={Icon} items={items} {valueSelected}  placeholder="Auswahl" on:select={handleSelect} on:clear={handleClear}></Select>
            </div>     
            <div class="flex_item1 select constant_width">   
                {#if showEbenen}
                    {#each ebenenChecks as checkedEbene}
                        <label>
                            <input type=checkbox bind:group={checkedEbenen} name="ebeneChecks" value={checkedEbene}  on:change={handleChange} >
                            {checkedEbene}
                        </label>
                    {/each}
                {/if}
                {#if showProjekte}
                    <Select  items={alleProjekte} placeholder="Auswahl Projekte" on:select={handleProjectPicked} on:clear={handleProjektClear}></Select>
                {/if}
            </div>
        </div>
        
        <div id="cy">
</div>
        
       
<!-- </main> --> 
<style> 
 .wrapper{
     display: flex;
     justify-content: flex-end;
     align-items: center; 
 }

 .wrapper1{
     display: flex;
     justify-content: flex-start;
     align-items: center; 
 }
 .flex_item{
     margin-right: 100px;
     margin-left: 10px;
 }
 .flex_item1{
     margin-right: 80px;
     margin-left: 10px;
 }

 .justify-start{
    margin-right:auto;
    font-family: Arial; 
 }

 .select{
     --borderRadius: 0px;
     --border:1px solid black;
     --borderHoverColor: black;
     --inputFontSize: 15px; 
     --height: 31px;
     --groupTitleFontSize: 500000px;
     --itemPadding: 1px 1px 1px 1px;
     
     font-family: Arial;  
    --selectedItemPadding: 0 10px 0 8px;
	--inputPadding: 0 10px 0 40px;
 }

 .flexible_width{
    min-width:20%;  
 }

 .constant_width{
     width: 20%;
 }

</style>