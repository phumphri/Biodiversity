console.log("In dropdown_menu.js")

dropdown_menu = document.getElementById("select_sampleid")

var dropdown_url = "/names";

Plotly.d3.json(dropdown_url, function (error, response) {

    if (error) return console.warn(error);

    console.log("Dropdown:  In Plotly.d3.json.")

    var sampleid_list = [response][0]

    for (i = 0; i < sampleid_list.length; i++) {

        sampleid = sampleid_list[i]

        console.log("sampleid:", sampleid)

        node = document.createElement("LI");

        textnode = document.createTextNode(sampleid);

        node.appendChild(textnode);
        
        dropdown_menu.appendChild(node);
    }

})