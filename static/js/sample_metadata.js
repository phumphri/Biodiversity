console.log("In sample_metadata.js")

// dropdown_menu = document.getElementById("select_sampleid")

var metadata_url = "/metadata/BB_944";

Plotly.d3.json(metadata_url, function (error, response) {

    if (error) return console.warn(error);

    console.log("Metadta:  In Plotly.d3.json.")

    console.log("response", response)

    // var sampleid_list = [response][0]

    // for (i = 0; i < sampleid_list.length; i++) {

    //     sampleid = sampleid_list[i]

    //     console.log("sampleid:", sampleid)

    //     node = document.createElement("LI");

    //     textnode = document.createTextNode(sampleid);

    //     node.appendChild(textnode);
        
    //     dropdown_menu.appendChild(node);
    // }

})

