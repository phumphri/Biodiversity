function plot_sample_bubble(sampleid) {

    Plotly.purge('bubble_chart');

    url = "https://" + window.location.host +  "/samples/" + sampleid

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        console.log("response:")
        console.log(response)

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
            autosize: false,
            height: 500,
            width:  1000
        };

        Plotly.newPlot('bubble_chart', data, layout);







    });
}

