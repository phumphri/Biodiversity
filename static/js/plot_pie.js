function plot_sample_pie(sampleid) {

    url = "https://"
    url = url + window.location.hostname + ":"
    url = url + window.location.port
    url = url + "/samples/" + sampleid

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        data_dict = {}
        data_dict["values"] = response[0]["otu_ids"]
        data_dict["labels"] = response[1]["sample_values"]
        data_dict["type"] = "pie"
        data = [data_dict]



        var layout = {autosize:true};

        Plotly.newPlot('pie_chart', data, layout);

    });
}
