function plot_sample_pie(sampleid) {

    let window_location_hostname = window.location.hostname
    let window_location_port = window.location.port
    var url = ""
    
    if (window_location_hostname = "127.0.0.1") {
        url = "http://"
    } else {
        url = "https://"
    }
    
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
