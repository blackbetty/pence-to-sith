var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

// Observe a specific DOM element:
observeDOM( document.body ,function(){ 
    walk(document.body);
});

function walk(node) 
{
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\bMike Pence\b/g, "Dark Lord Pence");
	v = v.replace(/\bIndiana Gov. Mike Pence\b/g, "Corn Imperator Pence");
	v = v.replace(/\bIndiana Governor Mike Pence\b/g, "Corn Imperator Pence");
	v = v.replace(/\bGovernor Mike Pence\b/g, "Dark Lord of the Sith, Darth Pence,");
	v = v.replace(/\bGovernor Pence\b/g, "Darth Pence");
	v = v.replace(/\bVice Presidential Candidate Mike Pence\b/g, "Sith Apprentice to Donald Trump, Darth Pence, ");
	
	textNode.nodeValue = v;
}


