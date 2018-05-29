function plot_sample_bubble(sampleid) {

    Plotly.purge('bubble_chart');

    url = "http://"
    url = url + window.location.hostname + ":"
    url = url + window.location.port
    url = url + "/samples/" + sampleid

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }


        var trace1 = {
            x: response[0]["otu_ids"],
            y: response[1]["sample_values"],
            mode: 'markers',
            marker: {
                size: response[1]["sample_values"]
            }
        };

        var data = [trace1];




        var layout = {
            showlegend: false,
            xaxis: { title: 'Operational Taxonomic Unit', range: [0, 3675] },
            yaxis: { title: 'Values' },
            autosize: true
        };

        Plotly.newPlot('bubble_chart', data, layout);







    });
}

