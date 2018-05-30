function select_sample_metadata(sampleid) {


    url = "https://" + window.location.host + "/metadata/" + sampleid

    d3.json(url, function (error, response) {

        if (error) {
            console.log("d3.json failed.")
            return console.warn(error);
        }

        metadata_list = []
        metadata_list.push("Age: " + response["AGE"])
        metadata_list.push("Type: " + response["BBTYPE"])
        metadata_list.push("Ethnicity: " + response["ETHNICITY"])
        metadata_list.push("Gender: " + response["GENDER"])
        metadata_list.push("Location: " + response["LOCATION"])
        metadata_list.push("Sample ID: " + response["SAMPLEID"])

        d3.select("body")
            .selectAll(".row")
            .selectAll(".col-lg-3")
            .selectAll(".panel")
            .selectAll(".panel-body")
            .selectAll(".list-group")
            .selectAll("li")
            .data(metadata_list)
            .text(function (d) { return d; })

    }
    )
}


